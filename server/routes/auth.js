var jwt = require('jsonwebtoken');
const expressjwt = require("express-jwt");
const {addUser} = require("../data_layer/MongoAccessor")

function testAPI(req, res) {
    console.log('testing api')
    res.send('Goettle is King')
}

function getMockDB() {
    var mockDB = {}
    mockDB['jackgoettle23@gmail.com'] = {
        'password': 'sexy',
        'first': 'jack',
        'last': 'goettle'
    }
    mockDB['dagmawi@seas.upenn.edu'] = {
        'password': 'dag',
        'first': 'Dag',
        'last': 'Dereje'
    }
    return mockDB
}

function verifyLogin(req, res) {
    const email = req.body.email;
    const pw = req.body.password;
    console.log('attempting to login...')
    console.log('e: ' + email + ', pw: ' + pw)
    var mockDB = getMockDB()
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
    }
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

function verifyRegister(req, res) {
    const email = req.body.email;
    const pw = req.body.password;
    const first = req.body.first
    const last = req.body.last
    const username = req.body.username;
    console.log('attempting to register...')
    console.log('e: ' + email + ', pw: ' + pw + ', first: ' + first + ', last: ' + last + ', username: ' + username)
    addUser(first, last, email, username, pw)
        .then((err) => {
            if (err) {
                res.status(200).send({
                    token: null,
                    success: false,
                    err: err
                })
            } else {
                let token = signJWT(email, first, last, [])
                res.status(200).send({
                    token: token,
                    success: true,
                    err: null
                })
            }
        })
}

module.exports = {
    testAPI: testAPI,
    verifyLogin: verifyLogin,
    verifyRegister: verifyRegister
}