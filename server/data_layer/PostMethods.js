const PostModel = require('../data_model/Post')
const UserModel = require('../data_model/User')
const PostCommentModel = require('../data_model/PostComment')
const crypto = require("crypto");

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

async function getPosts(username) {
    try {
        const userRes = await UserModel.find({username: username})
        const following = userRes[0].following
        const response = await PostModel.find()
        const followingPosts = []
        for (let i = 0; i < response.length; i++) {
            if (following.includes(response[i].username)) {
                followingPosts.push(response[i])
            }
        }
        const userPosts = await PostModel.find({username: username})
        const posts = followingPosts.concat(userPosts)
        // so most recent posts appear first
        posts.sort((a, b) => (a.postDate > b.postDate) ? -1 : 1)
        return modelResponse(posts, null)
    } catch (e) {
        return modelResponse(null, e);
    }
}

async function getUserPosts(username) {
    try {
        const response = await PostModel.find({username: username})
        // so most recent posts appear first
        response.reverse()
        console.log(response)
        return modelResponse(response, null)
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

async function addComment(commenter, postId, content) {
    console.log("commenting on post " + postId)
    try {
        // save the new comment to the post's comment list
        const postData = await PostModel.find({_id: postId})
        const comments = postData[0].comments
        const id = crypto.randomBytes(20).toString('hex');
        const comment = {
            id: id,
            username: commenter,
            content: content
        }
        comments.push(comment)
        console.log(comments)
        const data = await PostModel.updateOne({_id: postId}, {comments: comments});
        return modelResponse(data, null)
    } catch (e) {
        console.log(e)
        return modelResponse(null, e)
    }
}

async function deleteComment(postId, commentId) {
    console.log("deleting a comment on a post " + postId)
    try {
        const response = await PostModel.find({_id: postId})
        const comments = response[0].comments
        for (var i in comments) {
            if (comments[i].id == commentId) {
                comments.splice(i, 1);
            }
        }
        const updated = await UserModel.updateOne({_id: postId}, {comments: comments});
        return modelResponse(updated, null)
    } catch (e) {
        return modelResponse(null, e);
    }
}

async function hidePost(username, postId) {
    console.log("hiding post for user " + username)
    try {
        const response = UserModel.find({username: username})
        const hidden = response[0].hiddenPosts
        hidden.push(postId)
        await UserModel.updateOne({username: username}, {hidden: hidden})
        return modelResponse(null, null)
    } catch (e) {
        console.log(e)
        return modelResponse(null, e);
    }
}

// DELETE
async function getComments() {
    try {
        const response = await PostCommentModel.find()
        // so most recent comments appear first
        response.reverse()
        return modelResponse(response, null)
    } catch (e) {
        return modelResponse(null, e);
    }
}

module.exports = {
    newPost,
    deletePost,
    getPost,
    getPosts,
    getUserPosts,
    likePost,
    unlikePost,
    addComment,
    deleteComment,
    getComments,
    hidePost
}