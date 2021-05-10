const StreamModel = require("../data_model/Stream")
const StreamAnalyticsModel = require('../data_model/StreamAnalytics')

function modelResponse(data, error) {
    return {
        data: data,
        err: error
    }
}

async function beginStream(roomName, host) {
    const newRoom = new StreamModel({
        roomName: roomName,
        host: host
    })
    const newStream = new StreamAnalyticsModel({
        roomName: roomName,
        username: host,
        start: Date.now()
    })
    try {
        const data = await newRoom.save()
        await newStream.save()
        return modelResponse(data, null)
    } catch (e) {
        console.log(e)
        return modelResponse(null, e)
    }
}

async function endStream(user) {
    try {
        await StreamModel.deleteMany({host: user})
        const response = await StreamAnalyticsModel.find({username: user})
        for (var i in response) {
            const stream = response[i]
            if (stream.end == null) {
                console.log(stream)
                await StreamAnalyticsModel.updateOne({_id: stream._id}, {end: Date.now()})
                break
            }
        }
        return modelResponse(null, null)
    } catch (e) {
        console.log(e)
        return modelResponse(null, e)
    }
}

async function getStreams() {
    try {
        const streams = await StreamModel.find()
        return modelResponse(streams, null)
    } catch (e) {
        console.log(e)
        return modelResponse(null, e)
    }
}

module.exports = {
    beginStream,
    endStream,
    getStreams
}