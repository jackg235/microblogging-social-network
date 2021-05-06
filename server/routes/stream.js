const StreamMethods = require("../data_layer/StreamMethods")
const {responseError, responseOkay} = require('../data_model/StandardResponse')

function startStream(req, res) {
    const roomName = req.body.roomName
    const host = req.body.host
    StreamMethods.beginStream(roomName, host)
        .then(response => {
            if (response.err) {
                const resJSON = responseError(null, response.err)
                res.status(400).send(resJSON)
            } else {
                const resJSON = responseOkay(response.data, null)
                res.status(200).send(resJSON)
            }
        })
}

function endStream(req, res) {
    const user = req.body.user
    StreamMethods.endStream(user)
        .then(response => {
            if (response.err) {
                const resJSON = responseError(null, response.err)
                res.status(400).send(resJSON)
            } else {
                const resJSON = responseOkay(response.data, null)
                res.status(200).send(resJSON)
            }
        })
}

function getStreams(req, res) {
    StreamMethods.getStreams()
        .then(response => {
            if (response.err) {
                const resJSON = responseError(null, response.err)
                res.status(400).send(resJSON)
            } else {
                const resJSON = responseOkay(response.data, null)
                res.status(200).send(resJSON)
            }
        })
}

module.exports = {
    startStream,
    endStream,
    getStreams
}