const {getUser, followUser, blockUser, getBlockedBy, getContacts} = require("../data_layer/UserMethods")
const {responseError, responseOkay} = require('../data_model/StandardResponse')

function getAccount(req, res) {
    const username = req.params.username
    console.log('Getting user: ' + username)
    getUser(username)
        .then(response => {
            if (response.err) {
                const resJSON = responseError(null, response.err)
                res.status(400).send(resJSON)
            } else {
                const resJSON = responseOkay(response.data)
                res.status(200).send(resJSON)
            }
        })
}

function followToggle(req, res) {
    const username = req.body.username
    const otherId = req.body.otherUserId
    console.log(username + ' is trying to follow ' + otherId)
    followUser(username, otherId)
        .then(response => {
            console.log(response)
            if (response.err) {
                const resJSON = responseError(null, response.err)
                res.status(400).send(resJSON)
            } else {
                const resJSON = responseOkay(response.data)
                res.status(200).send(resJSON)
            }
        })
}

function blockToggle(req, res) {
    const username = req.body.username
    const userToBlock = req.body.userToBlock
    console.log(username + ' is trying to block/unblock ' + userToBlock)
    blockUser(username, userToBlock)
        .then(response => {
            console.log(response)
            if (response.err) {
                const resJSON = responseError(null, response.err)
                res.status(400).send(resJSON)
            } else {
                const resJSON = responseOkay(response.data)
                res.status(200).send(resJSON)
            }
        })
}

function getBlockers(req, res) {
    const username = req.params.username
    console.log('getting users that block ' + username)
    getBlockedBy(username)
        .then(response => {
            console.log(response)
            if (response.err) {
                const resJSON = responseError(null, response.err)
                res.status(400).send(resJSON)
            } else {
                const resJSON = responseOkay(response.data)
                res.status(200).send(resJSON)
            }
        })
}

function getUserContacts(req, res) {
    const username = req.params.username
    console.log('getting contacts of ' + username)
    getContacts(username)
        .then(response => {
            console.log(response)
            if (response.err) {
                const resJSON = responseError(null, response.err)
                res.status(400).send(resJSON)
            } else {
                const resJSON = responseOkay(response.data)
                res.status(200).send(resJSON)
            }
        })
}

module.exports = {
    getUserContacts: getUserContacts,
    getBlockers: getBlockers,
    block: blockToggle,
    follow: followToggle,
    getAccount: getAccount,
}