const jwt = require('jsonwebtoken');
const expressjwt = require("express-jwt");
const {createUser, loginUser, getUser, deleteUser} = require("../data_layer/UserMethods")
const {responseError, responseOkay} = require('../data_model/StandardResponse')
const UserModel = require('../data_model/User')

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
                let token = signJWT(user.email, user.first, user.last, [])
                user['token'] = token
                const resJSON = responseOkay(user)
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
                let token = signJWT(body.email, body.first, body.last, [])
                const resJSON = responseOkay(token)
                res.status(200).send(resJSON)
            }
        })
}

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

function deleteAccount(req, res) {
    const username = req.params.username
    console.log('Deleting user ' + username)
    deleteUser(username)
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

function signJWT(email, first, last, scopes) {
    return jwt.sign({
        sub: email,
        context: {
            scopes: scopes,
            user: {
                first: first,
                last: last,
                email: email
            }
        }
    }, "mykey", {
        expiresIn: 60
    })
}

module.exports = {
    testAPI: testAPI,
    verifyLogin: verifyLogin,
    verifyRegister: verifyRegister,
    deleteAccount: deleteAccount,
    getAccount: getAccount
}