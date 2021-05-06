const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const UserModel = require('../data_model/User')
const StreamModel = require('../data_model/Stream')


describe('Stream Endpoints', () => {
    it('should create a new stream', async (done) => {
        const stream = {
            roomName: "test room",
            host: "goettle"
        }
        const res = await request(app)
            .put('/streams/start')
            .send(stream)
        expect(res.statusCode).toEqual(200)
        done()
    })
    it('should get all streams', async (done) => {
        const res = await request(app)
            .get('/streams/getAll')
        expect(res.statusCode).toEqual(200)
        done()
    })
    it('should not delete a stream if the user is not the host', async (done) => {
        const stream = {
            user: "not goettle"
        }
        const res = await request(app)
            .delete('/streams/end')
            .send(stream)
        expect(res.statusCode).toEqual(200)
        done()
    })
    it('should delete a stream if the user is the host', async (done) => {
        const stream = {
            user: "goettle"
        }
        const res = await request(app)
            .delete('/streams/end')
            .send(stream)
        expect(res.statusCode).toEqual(200)
        done()
    })
    afterAll(async (done) => {
        //await StreamModel.deleteOne({roomName: "test room"})
        await mongoose.connection.close()
        done()
    })
})