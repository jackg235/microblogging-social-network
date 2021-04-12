const {db} = require('./MongoAccessor')

async function newPost(post) {
    console.log(post)
    try {
        // insert post
        db.collection('posts').insertOne(post, (err) => {
            if (err) {
                console.log(err)
                return err;
            }
        });

    } catch (e) {
        console.error(e);
        return e;
    }
    return null;
}

async function deletePost(postId) {
    console.log("deleting post " + postId)
    try {
        // TO DO
    } catch (e) {
        console.error(e);
        return e;
    }
    return null
}

async function getPost(postId) {
    console.log("getting post " + postId)
    try {
        // TO DO
    } catch (e) {
        console.error(e);
        return e;
    }
    return null
}

async function likePost(postId, username) {
    console.log("liking post " + postId)
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