const {getUser, followUser} = require("../data_layer/UserMethods")
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
    const otherId = req.body.userIDToFollow
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

module.exports = {
    follow: followToggle,
    getAccount: getAccount
}