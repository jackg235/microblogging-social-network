const jwt = require('jsonwebtoken');
const {createUser, loginUser, deleteUser} = require("../data_layer/UserMethods")
const {responseError, responseOkay} = require('../data_model/StandardResponse')
const bcrypt = require('bcryptjs');

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
                let token = signJWT(user.email, user.first, user.last, user.username, [])
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
                let token = signJWT(body.email, body.first, body.last, body.username, [])
                const resJSON = responseOkay(null, token)
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
                const resJSON = responseError(null, response.err)
                res.status(400).send(resJSON)
            } else {
                const resJSON = responseOkay(response.data, null)
                res.status(200).send(resJSON)
            }
        })
}

function signJWT(email, first, last, username, scopes) {
    return jwt.sign({
        sub: email,
        context: {
            scopes: scopes,
            user: {
                first: first,
                last: last,
                email: email,
                username: username,
            }
        }
    }, "mykey", {
        expiresIn: 600
    })
}

module.exports = {
    testAPI: testAPI,
    verifyLogin: verifyLogin,
    verifyRegister: verifyRegister,
    deleteAccount: deleteAccount
}