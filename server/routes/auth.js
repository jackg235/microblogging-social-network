const jwt = require('jsonwebtoken');
const {createUser, loginUser, deleteUser, changePasswordMethod, newProfileImage} = require("../data_layer/UserMethods")
const {responseError, responseOkay} = require('../data_model/StandardResponse')

function testAPI(req, res) {
    console.log('testing api')
    res.send('Goettle is King')
}

function verifyLogin(req, res) {
    const body = req.body
    console.log('Logging in...')
    console.log('e: ' + body.email + ', pw: ' + body.password)
    loginUser(body.email, body.password)
        .then((response) => {
            if (response.err) {
                const resJSON = responseError(null, response.err)
                res.status(400).send(resJSON)
            } else {
                const user = response.data
                let token = signJWT(user, [])
                const resJSON = responseOkay(user, token)
                res.status(200).send(resJSON)
            }
        })
}

function verifyRegister(req, res) {
    console.log('Registering new user...')
    const body = req.body
    createUser(body)
        .then((response) => {
            if (response.err) {
                const resJSON = responseError(null, response.err)
                res.status(400).send(resJSON)
            } else {
                const user = response.data
                const resJSON = responseOkay(response, null)
                res.status(200).send(resJSON)
            }
        })
}

function deleteAccount(req, res) {
    const username = req.params.username
    console.log('Deleting user ' + username)
    deleteUser(username)
        .then(response => {
            if (response.err) {
                console.log(response.err)
                const resJSON = responseError(null, response.err)
                res.status(400).send(resJSON)
            } else {
                const resJSON = responseOkay(response.data, null)
                res.status(200).send(resJSON)
            }
        })
}

function changePassword(req, res) {
    const username = req.body.username
    const newPassword = req.body.newPassword
    changePasswordMethod(username, newPassword)
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

function signJWT(user, scopes) {
    return jwt.sign({
        sub: user.username,
        context: {
            scopes: scopes,
            user: user
        }
    }, "mykey", {
        expiresIn: 600
    })
}

function changeProfilePhoto (req, res) {
    const username = req.body.username
    newProfileImage(username, req.file)
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
    testAPI: testAPI,
    verifyLogin: verifyLogin,
    verifyRegister: verifyRegister,
    deleteAccount: deleteAccount,
    changePassword,
    changeProfilePhoto
}