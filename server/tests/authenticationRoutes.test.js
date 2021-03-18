const request = require('supertest')
const app = require('../index')
var jwt = require('jsonwebtoken');
var decode = require('jwt-decode');

describe('Authentication Get Endpoints', () => {
    it('should test API', async(done) => {
        const res = await request(app)
            .get('/testAPI')
        expect(res.statusCode).toEqual(200)
        done()
    })
})

describe('Authentication Post Endpoints', () => {
    it('should login a user', async(done) => {
        const res = await request(app)
            .post('/verifyLogin')
            .send({
                email: "jackgoettle23@gmail.com",
                password: "sexy"
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body.success).toBe(true)
        done()
    })
    it('should fail to login a user', async(done) => {
        const res = await request(app)
            .post('/verifyLogin')
            .send({
                email: "reginald@gmail.com",
                password: "password"
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body.success).toBe(false)
        done()
    })
    it('should register a user', async(done) => {
        const res = await request(app)
            .post('/verifyRegister')
            .send({
                email: "address@gmail.com",
                password: "password",
                first: "jack",
                last: "goettle"
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body.success).toBe(true)
        done()
    })
    it('should fail to register a user', async(done) => {
        const res = await request(app)
            .post('/verifyRegister')
            .send({
                email: "jackgoettle23@gmail.com",
                password: "password",
                first: "jack",
                last: "goettle"
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body.success).toBe(false)
        done()
    })
})