const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const UserModel = require('../data_model/User')

const testUserJSON = {
    first: "jack",
    last: "goettle",
    username: "usertest",
    email: "usertest@gmail.com",
    password: "password"
}
const testUserJSON2 = {
    first: "dag",
    last: "dereje",
    username: "usertest2",
    email: "usertest2@gmail.com",
    password: "password"
}

describe('User Endpoints', () => {
    it('should register new users for testing', async (done) => {
        const res = await request(app)
            .post('/verifyRegister')
            .send(testUserJSON)
        expect(res.statusCode).toEqual(200)
        const res2 = await request(app)
            .post('/verifyRegister')
            .send(testUserJSON2)
        expect(res2.statusCode).toEqual(200)
        done()
    })
    it('should retrieve a user', async (done) => {
        const res = await request(app)
            .get(`/users/${testUserJSON.username}`)
        expect(res.statusCode).toEqual(200)
        done()
    })
    it('should fail to retrieve a user who doesnt exist', async (done) => {
        const badUsername = "badUsername"
        const res = await request(app)
            .get(`/users/${badUsername}`)
        expect(res.statusCode).toEqual(400)
        done()
    })
    it('should follow and unfollow user', async (done) => {
        // get ID of user to follow
        const res = await request(app)
            .get(`/users/${testUserJSON2.username}`)
        expect(res.statusCode).toEqual(200)
        const followId = JSON.parse(res.text).data._id;
        const followReq = {
            username: testUserJSON.username,
            userIDToFollow: followId
        }
        // follow the user
        const res2 = await request(app)
            .post(`/users/follow`)
            .send(followReq)
        expect(res2.statusCode).toEqual(200)
        const data = JSON.parse(res2.text).data;
        expect(data.nModified).toEqual(1)

        // check that the user is in the following
        const res3 = await request(app).get(`/users/${testUserJSON2.username}`)
        expect(res3.statusCode).toEqual(200)
        const following = JSON.parse(res3.text).data.following
        expect(following.includes(followId))

        // unfollow the user
        const res4 = await request(app)
            .post(`/users/follow`)
            .send(followReq)
        expect(res4.statusCode).toEqual(200)
        const data1 = JSON.parse(res4.text).data;
        expect(data1.nModified).toEqual(1)

        const res5 = await request(app).get(`/users/${testUserJSON2.username}`)
        expect(res5.statusCode).toEqual(200)
        const following1 = JSON.parse(res5.text).data.following
        expect(!following1.includes(followId))
        done()
    })
    afterAll(async (done) => {
        await UserModel.deleteOne({username: testUserJSON.username})
        await UserModel.deleteOne({username: testUserJSON2.username})
        await mongoose.connection.close()
        done()
    })
})