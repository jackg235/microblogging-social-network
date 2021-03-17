var jwt = require('jsonwebtoken');
const expressjwt = require("express-jwt");

function testAPI(req, res) {
    console.log('testing api')
    res.send('Goettle is King')
}

function getProspectiveStudentMockDB() {
    var mockDB = {}
    mockDB['jackgoettle23@gmail.com'] = {
        'password': 'sexy',
        'first': 'jack',
        'last': 'goettle'
    }
    mockDB['jgoettle@seas.upenn.edu'] = {
        'password': 'beast',
        'first': 'jack',
        'last': 'goettle'
    }
    return mockDB
}

function verifyLogin(req, res) {
    var email = req.body.email;
    var pw = req.body.password;
    console.log('attempting to login...')
    console.log('e: ' + email + ', pw: ' + pw)
    var mockDB = getProspectiveStudentMockDB()
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
        iss: 'collegetalks.com',
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
    var email = req.body.email;
    var pw = req.body.password;
    var first = req.body.first
    var last = req.body.last
    console.log('attempting to register...')
    console.log('e: ' + email + ', pw: ' + pw + ', first: ' + first + ', last: ' + last)
    var mockDB = getProspectiveStudentMockDB()
        // will need to throw server error 400 if server error
    if (email in mockDB) {
        console.log('ERR: user exists... ')
        res.status(200).send({
            token: null,
            success: false,
            err: 'User already exists'
        })
    } else {
        let token = signJWT(email, first, last, [])
            // write to userdb
        res.status(200).send({
            token: token,
            success: true,
            err: null
        })
    }
}

module.exports = {
    testAPI: testAPI,
    verifyLogin: verifyLogin,
    verifyRegister: verifyRegister
}