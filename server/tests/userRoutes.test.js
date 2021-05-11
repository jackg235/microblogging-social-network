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
        const followReq = {
            username: testUserJSON.username,
            otherUserId: testUserJSON2.username
        }
        // follow the user
        const res2 = await request(app)
            .post(`/users/follow`)
            .send(followReq)
        expect(res2.statusCode).toEqual(200)

        // check that the user is in the following
        const res3 = await request(app).get(`/users/${testUserJSON.username}`)
        expect(res3.statusCode).toEqual(200)
        const following = JSON.parse(res3.text).data.following
        expect(following.includes(testUserJSON2.username))

        // check that the user is in the followers
        const r = await request(app).get(`/users/${testUserJSON2.username}`)
        expect(r.statusCode).toEqual(200)
        const followers = JSON.parse(r.text).data.followers
        expect(followers.includes(testUserJSON.username))

        // unfollow the user
        const res4 = await request(app)
            .post(`/users/follow`)
            .send(followReq)
        expect(res4.statusCode).toEqual(200)

        // check that the user is no longer in following
        const res5 = await request(app).get(`/users/${testUserJSON.username}`)
        expect(res5.statusCode).toEqual(200)
        const following1 = JSON.parse(res5.text).data.following
        expect(!following1.includes(testUserJSON2.username))

        // check that the user is no longer in followers
        const res6 = await request(app).get(`/users/${testUserJSON2.username}`)
        expect(res6.statusCode).toEqual(200)
        const followers1 = JSON.parse(res6.text).data.followers
        expect(!followers1.includes(testUserJSON.username))
        done()
    })
    it('should block a user', async (done) => {
        const blockReq = {
            username: testUserJSON.username,
            userToBlock: testUserJSON2.username
        }
        // block the user
        const res = await request(app)
            .post(`/users/block`)
            .send(blockReq)
        expect(res.statusCode).toEqual(200)

        // get blockers
        const res2 = await request(app).get(`/users/blockers/${testUserJSON.username}`)
        expect(res2.statusCode).toEqual(200)
        done()
    })
    it('should fail block a user for a bad username', async (done) => {
        const blockReq = {
            username: "i_dont_exist",
            userToBlock: testUserJSON2.username
        }
        // block the user
        const res = await request(app)
            .post(`/users/block`)
            .send(blockReq)
        expect(res.statusCode).toEqual(400)
        done()
    })
    it('should get a users contacts', async (done) => {
        const res = await request(app).get(`/users/contacts/${testUserJSON.username}`)
        expect(res.statusCode).toEqual(200)
        done()
    })
    it('should fail to get a users contacts for a bad username', async (done) => {
        const badUsername = "i_dont_exist"
        const res = await request(app).get(`/users/contacts/${badUsername}`)
        expect(res.statusCode).toEqual(400)
        done()
    })
    it('should get a users suggested contacts', async (done) => {
        const res = await request(app).get(`/users/suggested/${testUserJSON.username}`)
        expect(res.statusCode).toEqual(200)
        done()
    })
    it('should fail to get a users suggested contacts for a bad username', async (done) => {
        const badUsername = "i_dont_exist"
        const res = await request(app).get(`/users/suggested/${badUsername}`)
        expect(res.statusCode).toEqual(400)
        done()
    })
    it('should get a users blocked contacts', async (done) => {
        const res = await request(app).get(`/users/blocking/${testUserJSON.username}`)
        expect(res.statusCode).toEqual(200)
        done()
    })
    it('should fail to get a users blocked contacts for a bad username', async (done) => {
        const badUsername = "i_dont_exist"
        const res = await request(app).get(`/users/blocking/${badUsername}`)
        expect(res.statusCode).toEqual(400)
        done()
    })
    afterAll(async (done) => {
        await UserModel.deleteOne({username: testUserJSON.username})
        await UserModel.deleteOne({username: testUserJSON2.username})
        await mongoose.connection.close()
        done()
    })
})