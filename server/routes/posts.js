const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const PostModel = require('../data_model/Post')
const PostMethods = require('../data_layer/PostMethods')
const {responseError, responseOkay} = require('../data_model/StandardResponse')

function newPost(req, res) {
    const body = req.body
    PostMethods.newPost(body)
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

function deletePost(req, res) {
    const username = req.body.username
    const postId = req.body.postId
    PostMethods.deletePost(username, postId)
        .then(response => {
            if (response.err) {
                const resJSON = responseError(null, null, response.err)
                res.status(400).send(resJSON)
            } else {
                const resJSON = responseOkay(null, null)
                res.status(200).send(resJSON)
            }
        })

}

function getPost(req, res) {
    const postId = req.params.postId
    PostMethods.getPost(postId)
        .then(response => {
            if (response.err) {
                const resJSON = responseError(null, null, response.err)
                res.status(400).send(resJSON)
            } else {
                const resJSON = responseOkay(response.data, null)
                res.status(200).send(resJSON)
            }
        })

}

function getPosts(req, res) {
    const username = req.params.username
    console.log('attempting to get posts for home feed')
    PostMethods.getPosts(username)
        .then(response => {
            if (response.err) {
                const resJSON = responseError(null, null, response.err)
                res.status(400).send(resJSON)
            } else {
                const resJSON = responseOkay(response.data, null)
                res.status(200).send(resJSON)
            }
        })

}

function getUserPosts(req, res) {
    const username = req.params.username
    console.log('attempting to get posts for profile page')
    PostMethods.getUserPosts(username)
        .then(response => {
            if (response.err) {
                const resJSON = responseError(null, null, response.err)
                res.status(400).send(resJSON)
            } else {
                const resJSON = responseOkay(response.data, null)
                res.status(200).send(resJSON)
            }
        })

}

function addComment(req, res) {
    const postId = req.body.postId
    const content = req.body.content
    const commenter = req.body.commenterId
    PostMethods.addComment(commenter, postId, content)
        .then((response) => {
            if (response.err) {
                const resJSON = responseError(null, null, response.err)
                res.status(400).send(resJSON)
            } else {
                const resJSON = responseOkay(response.data, null)
                res.status(200).send(resJSON)
            }
        })
}

function deleteComment(req, res) {
    const postId = req.body.postId
    PostMethods.deleteComment(postId)
        .then((response) => {
            if (response.err) {
                const resJSON = responseError(null, null, response.err)
                res.status(400).send(resJSON)
            } else {
                const resJSON = responseOkay(response.data, null)
                res.status(200).send(resJSON)
            }
        })

}

function getComments(req, res) {
    PostMethods.getComments()
        .then(response => {
            if (response.err) {
                console.log(response.err)
                const resJSON = responseError(null, null, response.err)
                res.status(400).send(resJSON)
            } else {
                console.log(response)
                const resJSON = responseOkay(response.data, null)
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
    getPosts: getPosts,
    getUserPosts: getUserPosts,
    addComment: addComment,
    deleteComment: deleteComment,
    getComments: getComments,
    like: likePost,
    unlike: unlikePost
}