const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../index')
const UserModel = require('../data_model/User')

const testUserJSON = {
    first: "jack",
    last: "goettle",
    username: "test",
    email: "test@gmail.com",
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

describe('Authentication Post Endpoints', () => {
    it('should register a new user', async (done) => {
        const res = await request(app)
            .post('/verifyRegister')
            .send(testUserJSON)
        expect(res.statusCode).toEqual(200)
        done()
    })
    it('should register a user with a duplicated email or username', async (done) => {
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
    afterAll(async (done) => {
        await UserModel.deleteMany({username: "test"})
        await mongoose.connection.close()
        done()
    })
})