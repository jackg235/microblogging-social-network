const jwt = require('jsonwebtoken');
const {chatToken, videoToken, voiceToken, universalToken} = require('../chat/tokens')
const config = require('../chat/config')

const sendTokenResponse = (token, res) => {
    res.set('Content-Type', 'application/json');
    res.status(200).send({
        token: token.toJwt(),
        success: true,
        err: null
    })
};

function getToken(req, res) {
    const identity = req.query.identity;
    const token = chatToken(identity, config);
    sendTokenResponse(token, res);
}

function postToken(req, res) {
    const identity = req.body.identity;
    const token = chatToken(identity, config);
    sendTokenResponse(token, res);
}

function getVideoToken(req, res) {
    const identity = req.query.identity;
    const room = req.query.room;
    const token = videoToken(identity, room, config);
    sendTokenResponse(token, res);
}

function postVideoToken(req, res) {
    const identity = req.body.identity;
    const room = req.body.room;
    console.log(room + " " + identity)
    const token = videoToken(identity, room, config);
    sendTokenResponse(token, res);
}

function getVoiceToken(req, res) {
    const identity = req.body.identity;
    const token = voiceToken(identity, config);
    sendTokenResponse(token, res);
}

function postVoiceToken(req, res) {
    const identity = req.body.identity;
    const token = voiceToken(identity, config);
    sendTokenResponse(token, res);
}

function getUniversalToken(req, res) {
    const identity = req.query.identity;
    const room = req.query.room;
    const token = universalToken(identity, room, config)
    sendTokenResponse(token, res);
}

function postUniversalToken(req, res) {
    const identity = req.body.identity;
    const room = req.body.room;
    const token = universalToken(identity, room, config)
    sendTokenResponse(token, res);
}


module.exports = {
    getToken: getToken,
    postToken: postToken,
    getVideoToken: getVideoToken,
    postVideoToken: postVideoToken,
    getVoiceToken: getVoiceToken,
    postVoiceToken: postVoiceToken,
    getUniversalToken: getUniversalToken,
    postUniversalToken
}