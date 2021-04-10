const jwt = require('jsonwebtoken');
const expressjwt = require("express-jwt");
const {addUser} = require("../data_layer/UserMethods")
const {responseError, responseOkay} = require('../data_model/StandardResponse')
const {newUser} = require('../data_model/User')

function testAPI(req, res) {
    console.log('testing api')
    res.send('Goettle is King')
}

function verifyLogin(req, res) {
    const body = req.body
    const email = req.body.email;
    const pw = req.body.password;
    console.log('Logging in...')
    console.log('e: ' + email + ', pw: ' + pw)
    let token = signJWT("", "", "", [])
    const resJSON = responseOkay(null, token)
    res.status(200).send(resJSON)
    /*var mockDB = getMockDB()
    // will need to throw server error 400 if server error
    if (email in mockDB && pw == mockDB[email]['password']) {
        var json = mockDB[email]
        let token = signJWT(email, json['first'], json['last'], [])
        res.status(200).send({
            token: token,
            success: true,
            err: null
        })
    } else {
        res.status(200).send({
            token: null,
            success: false,
            err: 'Incorrect email or password'
        })
    } */
}

function verifyRegister(req, res) {
    console.log('Registering new user...')
    const body = req.body
    const user = newUser(body.first, body.last, body.email, body.username, body.password);
    addUser(user)
        .then((err) => {
            if (err) {
                const resJSON = responseError(null, null, err)
                res.status(400).send(resJSON)
            } else {
                let token = signJWT(body.email, body.first, body.last, [])
                const resJSON = responseOkay(null, token)
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
    verifyRegister: verifyRegister
}