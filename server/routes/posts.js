const jwt = require('jsonwebtoken');
const PostModel = require('../data_model/Post')
const PostMethods = require('../data_layer/PostMethods')
const {responseError, responseOkay} = require('../data_model/StandardResponse')

function newPost(req, res) {
    const body = req.body
    //const post = PostModel.newPost(body.username, body.title, body.content, body.media);
    const post = null
    PostMethods.newPost(post)
        .then((err) => {
            if (err) {
                const resJSON = responseError(null, null, err)
                res.status(400).send(resJSON)
            } else {
                const resJSON = responseOkay(null, null)
                res.status(200).send(resJSON)
            }
        })
}

function deletePost(req, res) {
    const postId = req.body.postId
    PostMethods.deletePost(postId)
        .then((err) => {
            if (err) {
                const resJSON = responseError(null, null, err)
                res.status(400).send(resJSON)
            } else {
                const resJSON = responseOkay(null, null)
                res.status(200).send(resJSON)
            }
        })

}

function getPost(req, res) {
    const postId = req.body.postId
    PostMethods.getPost(postId)
        .then((data, err) => {
            if (err) {
                const resJSON = responseError(null, null, err)
                res.status(400).send(resJSON)
            } else {
                const resJSON = responseOkay(data, null)
                res.status(200).send(resJSON)
            }
        })

}

function addComment(req, res) {
    const postId = req.body.postId
    const content = req.body.content
    PostMethods.addComment(postId, content)
        .then((err) => {
            if (err) {
                const resJSON = responseError(null, null, err)
                res.status(400).send(resJSON)
            } else {
                const resJSON = responseOkay(null, null)
                res.status(200).send(resJSON)
            }
        })
}

function deleteComment(req, res) {
    const postId = req.body.postId
    PostMethods.deleteComment(postId)
        .then((err) => {
            if (err) {
                const resJSON = responseError(null, null, err)
                res.status(400).send(resJSON)
            } else {
                const resJSON = responseOkay(null, null)
                res.status(200).send(resJSON)
            }
        })

}

function likePost(req, res) {
    const postId = req.body.postId
    const username = req.body.username
    PostMethods.likePost(postId, username)
        .then((err) => {
            if (err) {
                const resJSON = responseError(null, null, err)
                res.status(400).send(resJSON)
            } else {
                const resJSON = responseOkay(null, null)
                res.status(200).send(resJSON)
            }
        })

}

function unlikePost(req, res) {
    const postId = req.body.postId
    PostMethods.unlikePost(postId)
        .then((err) => {
            if (err) {
                const resJSON = responseError(null, null, err)
                res.status(400).send(resJSON)
            } else {
                const resJSON = responseOkay(null, null)
                res.status(200).send(resJSON)
            }
        })
}


module.exports = {
    new: newPost,
    delete: deletePost,
    get: getPost,
    addComment: addComment,
    deleteComment: deleteComment,
    like: likePost,
    unlike: unlikePost
}