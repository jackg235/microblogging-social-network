const PostModel = require('../data_model/Post')
const UserModel = require('../data_model/User')
const PostAnalyticsModel = require('../data_model/PostAnalytics')
const fs = require('fs')

function modelResponse(data, error) {
    return {
        data: data,
        err: error
    }
}

async function newPost(username, title, content, image) {
    let media = null;
    if (image != null) {
        media = {
            data: fs.readFileSync(image.path),
            contentType: "image/jpeg"
        }
    }
    const post = {
        username: username,
        title: title,
        content: content,
        media: media
    }
    const newPost = new PostModel(post)
    try {
        // save the new post to post db
        const data = await newPost.save()
        const postId = data._id
        // save the new post to users posts
        const userData = await UserModel.find({username: username})
        const posts = userData[0].posts
        posts.push(postId)
        await UserModel.updateOne({username: username}, {posts: posts});

        // update post analytics
        const a = await PostAnalyticsModel.find({username: username})
        if (a.length == 0) {
            const postDate = Date.now()
            const newAnalytics = new PostAnalyticsModel({
                username: post.username,
                postDate: postDate,
                numPosts: 1
            })
            await newAnalytics.save()
        } else {
            const analytics = a[0]
            const postDate = Date.now()
            const numPosts = analytics.numPosts + 1
            await PostAnalyticsModel.updateOne({username: post.username}, {
                numPosts: numPosts,
                mostRecentPostDate: postDate
            });
        }
        return modelResponse(data, null)
    } catch (e) {
        console.log(e)
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
        // update post analytics
        const a = await PostAnalyticsModel.find({username: username})
        const analytics = a[0]
        const numPosts = analytics.numPosts - 1
        await PostAnalyticsModel.updateOne({username: username}, {
            numPosts: numPosts,
        });
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
        const hidden = userRes[0].hiddenPosts
        const allPosts = await PostModel.find()
        const followingPosts = []
        // get all the following posts that aren't hidden
        for (let i = 0; i < allPosts.length; i++) {
            const post = allPosts[i];
            if (following.includes(post.username) && !hidden.includes(post._id)) {
                followingPosts.push(post)
            }
        }
        // also add the current users posts
        const userPosts = await PostModel.find({username: username})
        const posts = followingPosts.concat(userPosts)
        // so most recent posts appear first
        posts.sort((a, b) => (a.postDate > b.postDate) ? -1 : 1)
        return modelResponse(posts, null)
    } catch (e) {
        return modelResponse(null, e);
    }
}

async function getUserPosts(username, profileUsername) {
    try {
        const postsRes = await PostModel.find({username: profileUsername})
        // remove hidden posts
        const userRes = await UserModel.find({username: username})
        const hiddenPosts = userRes[0].hiddenPosts
        const blockedBy = userRes[0].blockedBy
        const finalPosts = []
        if (!blockedBy.includes(profileUsername)) {
            for (let i = 0; i < postsRes.length; i++) {
                let postId = postsRes[i]._id
                if (!hiddenPosts.includes(postId)) {
                    finalPosts.push(postsRes[i])
                }
            }
        }
        // so most recent posts appear first
        finalPosts.reverse()
        return modelResponse(finalPosts, null)
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


async function addComment(commenter, postId, content) {
    console.log("commenting on post " + postId)
    try {
        // save the new comment to the post's comment list
        const postData = await PostModel.find({_id: postId})
        const comments = postData[0].comments
        const comment = {
            username: commenter,
            content: content
        }
        comments.push(comment)
        const data = await PostModel.updateOne({_id: postId}, {comments: comments});

        // update post analytics
        const a = await PostAnalyticsModel.find({username: commenter})
        if (a.length == 0) {
            const newAnalytics = new PostAnalyticsModel({
                username: commenter,
                numComments: 1,
            })
            await newAnalytics.save()
        } else {
            const analytics = a[0]
            const numComments = analytics.numComments + 1
            await PostAnalyticsModel.updateOne({username: commenter}, {
                numComments: numComments
            });
        }
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
        const username = response[0].username
        for (var i in comments) {
            if (comments[i]._id == commentId) {
                comments.splice(i, 1);
                const updated = await PostModel.updateOne({_id: postId}, {comments: comments});
                // update post analytics
                const a = await PostAnalyticsModel.find({username: username})
                const analytics = a[0]
                const numComments = analytics.numComments - 1
                await PostAnalyticsModel.updateOne({username: username}, {
                    numComments: numComments,
                });
                return modelResponse(updated, null)
            }
        }
    } catch (e) {
        return modelResponse(null, e);
    }
}

async function hidePost(username, postId) {
    console.log("hiding post for user " + username)
    try {
        const response = await UserModel.find({username: username})
        const hidden = response[0].hiddenPosts
        hidden.push(postId)
        await UserModel.updateOne({username: username}, {hiddenPosts: hidden})
        return modelResponse(hidden, null)
    } catch (e) {
        console.log(e)
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
    addComment,
    deleteComment,
    hidePost
}