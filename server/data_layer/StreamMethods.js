const StreamModel = require("../data_model/Stream")

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
    try {
        const data = await newRoom.save()
        return modelResponse(data, null)
    } catch (e) {
        console.log(e)
        return modelResponse(null, e)
    }
}

async function endStream(user) {
    try {
        await StreamModel.deleteMany({host: user})
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