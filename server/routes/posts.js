
const PostMethods = require('../data_layer/PostMethods')
const {responseError, responseOkay} = require('../data_model/StandardResponse')

function newPost(req, res) {
    const body = req.body
    PostMethods.newPost(body.username, body.title, body.content, req.file)
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
    const profileUsername = req.params.profileUser
    console.log('attempting to get posts for profile page')
    PostMethods.getUserPosts(username, profileUsername)
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
    const commentId = req.body.commentId
    PostMethods.deleteComment(postId, commentId)
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

function hidePost(req, res) {
    const username = req.body.username
    const postId = req.body.postId
    PostMethods.hidePost(username, postId)
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


module.exports = {
    new: newPost,
    delete: deletePost,
    get: getPost,
    getPosts: getPosts,
    getUserPosts: getUserPosts,
    addComment: addComment,
    deleteComment: deleteComment,
    hidePost
}