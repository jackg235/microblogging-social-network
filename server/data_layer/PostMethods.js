const PostModel = require('../data_model/Post')
const UserModel = require('../data_model/User')

function modelResponse(data, error) {
    return {
        data: data,
        err: error
    }
}

async function newPost(post) {
    const newPost = new PostModel(post)
    try {
        // save the new post to post db
        const data = await newPost.save()
        const postId = data._id
        // save the new post to users posts
        const userData = await UserModel.find({username: post.username})
        const posts = userData[0].posts
        posts.push(postId)
        await UserModel.updateOne({username: post.username}, {posts: posts});
        return modelResponse(data, null)
    } catch (e) {
        return modelResponse(null, e)
    }
}

async function deletePost(username, postId) {
    try {
        const response = await UserModel.find({username: username})
        const posts = response[0].posts
        if (!posts.includes(postId)) {
            return modelResponse(null, "Can't delete a post that is not the users")
        }
        const index = posts.indexOf(postId);
        if (index > -1) {
            posts.splice(index, 1);
        }
        await UserModel.updateOne({username: username}, {posts: posts});
        await PostModel.deleteOne({_id: postId})
        return modelResponse(null, null)
    } catch (e) {
        return modelResponse(null, e);
    }
}

async function getPost(postId) {
    try {
        const response = await PostModel.find({_id: postId})
        if (response.length == 0) {
            return modelResponse(null, "Error: can't find post with given id")
        }
        return modelResponse(response[0], null)
    } catch (e) {
        return modelResponse(null, e);
    }
}

async function likePost(postId, username) {
    try {
        // TO DO
    } catch (e) {
        console.error(e);
        return e;
    }
    return null
}

async function unlikePost(postId) {
    console.log("unliking post " + postId)
    try {
        // TO DO
    } catch (e) {
        console.error(e);
        return e;
    }
    return null
}

async function addComment(postId, content) {
    console.log("commenting on post " + postId)
    try {
        // TO DO
    } catch (e) {
        console.error(e);
        return e;
    }
    return null
}

async function deleteComment(postId, commentId) {
    console.log("deleting a comment on a post " + postId)
    try {
        // TO DO
    } catch (e) {
        console.error(e);
        return e;
    }
    return null
}

module.exports = {newPost, deletePost, getPost, likePost, unlikePost, addComment, deleteComment}