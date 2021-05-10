const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const UserModel = require('../data_model/User')
const bcrypt = require('bcryptjs');

const testUserJSON = {
    first: "jack",
    last: "goettle",
    username: "test",
    email: "test@gmail.com",
    password: "password"
}
const testUserJSON2 = {
    first: "dag",
    last: "dereje",
    username: "test2",
    email: "test21@gmail.com",
    password: "password"
}

describe('Authentication Get Endpoints', () => {
    it('should test API', async (done) => {
        const res = await request(app)
            .get('/testAPI')
        expect(res.statusCode).toEqual(200)
        done()
    })
})

describe('Authentication Endpoints', () => {
    it('should register a new user', async (done) => {
        const res = await request(app)
            .post('/verifyRegister')
            .send(testUserJSON)
        expect(res.statusCode).toEqual(200)
        done()
    })
    it('should fail to register a user with a duplicated email or username', async (done) => {
        const res = await request(app)
            .post('/verifyRegister')
            .send(testUserJSON)
        expect(res.statusCode).toEqual(400)
        done()
    })
    it('should login a user that exists in the database', async (done) => {
        const res = await request(app)
            .post('/verifyLogin')
            .send({
                email: testUserJSON.email,
                password: testUserJSON.password
            })
        expect(res.statusCode).toEqual(200)
        done()
    })
    it('should fail to login a user that does not in the database', async (done) => {
        const res = await request(app)
            .post('/verifyLogin')
            .send({
                email: "bad email",
                password: "bad password"
            })
        expect(res.statusCode).toEqual(400)
        done()
    })
    it('should fail to login a user that enters an incorrect password', async (done) => {
        const res = await request(app)
            .post('/verifyLogin')
            .send({
                email: testUserJSON.email,
                password: "bad password"
            })
        expect(res.statusCode).toEqual(400)
        done()
    })
    it('should delete a user', async (done) => {
        const res = await request(app)
            .post('/verifyRegister')
            .send(testUserJSON2)
        expect(res.statusCode).toEqual(200)
        const res2 = await request(app).delete(`/users/delete/${testUserJSON2.username}`)
        expect(res2.statusCode).toEqual(200)
        done()
    })
    it('should fail to delete a user that doesnt exist', async (done) => {
        const badUsername = "badUsername"
        const res = await request(app).delete(`/users/delete/${badUsername}`)
        expect(res.statusCode).toEqual(400)
        done()
    })
    it('should change a users password', async (done) => {
        const res = await request(app)
            .post('/changePassword')
            .send({
                username: testUserJSON.username,
                newPassword: "new password"
            })
        expect(res.statusCode).toEqual(200)
        // check that the user can log in with new password
        const res2 = await request(app)
            .post('/verifyLogin')
            .send({
                email: testUserJSON.email,
                password: "new password"
            })
        expect(res2.statusCode).toEqual(200)
        done()
    })
    afterAll(async (done) => {
        await UserModel.deleteOne({username: "test"})
        await UserModel.deleteOne({username: "test2"})
        await mongoose.connection.close()
        done()
    })
})