// attempts to create a new blog post
import {getPostFailure, getPostSuccess, postFailure, postSuccess} from "../reducers/PostReducer";

export function createPost(title, content, posterId) {
    console.log('attempting to create a post called... ' + title + ' by... ' + posterId)
    return function (dispatch) {
        const likes = new Set();
        const comments = {};
        return fetch(`http://localhost:5000/posts/new`, {
            method: 'POST',
            body: JSON.stringify({
                title,
                content,
                posterId,
                likes,
                comments
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log('create post success = ' + res.success)
                // if the post was created successfully, update allPosts in state
                if (res.success) {
                    // dispatch(postSuccess());
                    getAllPosts()
                } else {
                    // failed to create post
                    dispatch(postFailure(res))
                }
            })
    }
}

// attempts to delete the blog post with the specified title
export function deletePost(postId, posterId) {
    console.log('attempting to delete a post with id... ' + postId + ' by... ' + posterId)
    return function (dispatch) {
        return fetch(`http://localhost:5000/posts/delete`, {
            method: 'DELETE',
            body: JSON.stringify({
                postId,
                posterId,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log('delete post success = ' + res.success)
                // if the post was deleted successfully, update allPosts in state
                if (res.success) {
                    getAllPosts();
                } else {
                    // failed to delete post
                    dispatch(postFailure(res))
                }
            })
    }
}

// attempts to get the specified blog post
export function getPost(postId, posterId) {
    console.log('attempting to get a post with id... ' + postId + ' by... ' + posterId)
    return function (dispatch) {
        return fetch(`http://localhost:5000/posts/get`, {
            method: 'GET',
            body: JSON.stringify({
                postId,
                posterId,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log('get post success = ' + res.success)
                // if the post was retrieved successfully, set the error to null
                if (res.success) {
                    dispatch(getPostSuccess());
                } else {
                    // failed to get post
                    dispatch(getPostFailure(res))
                }
            })
    }
}

// attempts to get all blog posts from all users
export function getAllPosts() {
    console.log('attempting to get all posts... ')
    return function (dispatch) {
        return fetch(`http://localhost:5000/posts/getAll`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log('get all posts success = ' + res.success)
                // if all the posts were retrieved successfully, update allPosts
                if (res.success) {
                    console.log('all posts res.data is: ' + res.data);
                    dispatch(postSuccess(res.data));
                } else {
                    // failed to create post
                    dispatch(postFailure(res))
                }
            })
    }
}

// attempts to add a comment on the specified post
export function addComment(commenterId, content, postId, posterId) {
    console.log('attempting to add a comment from... ' + commenterId + ' on a post by... ' + posterId);
    return function (dispatch) {
        return fetch(`http://localhost:5000/posts/addComment`, {
            // should this be changed to a put or patch maybe?
            method: 'POST',
            body: JSON.stringify({
                commenterId,
                content,
                postId,
                posterId,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log('add comment success = ' + res.success)
                // if the comment was posted successfully, update allPosts in state
                if (res.success) {
                    getAllPosts();
                } else {
                    // failed to add comment to post
                    dispatch(postFailure(res))
                }
            })
    }
}

// attempts to delete a comment on the specified post
export function deleteComment(commenterId, commentId, postId, posterId) {
    console.log('attempting to delete a comment from... ' + commenterId + ' on a post by... ' + posterId);
    return function (dispatch) {
        return fetch(`http://localhost:5000/posts/deleteComment`, {
            method: 'DELETE',
            body: JSON.stringify({
                commenterId,
                commentId,
                postId,
                posterId,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log('delete comment success = ' + res.success)
                // if the comment was deleted successfully, update allPosts in state
                if (res.success) {
                    getAllPosts();
                } else {
                    // failed to add comment to post
                    dispatch(postFailure(res))
                }
            })
    }
}

// attempts to like the specified post for the given user
export function likePost(likerId, postId, posterId) {
    console.log(likerId + ' is attempting to like a post from... ' + posterId);
    return function (dispatch) {
        return fetch(`http://localhost:5000/posts/like`, {
            // should this be changed to a put or patch maybe?
            method: 'POST',
            body: JSON.stringify({
                likerId,
                postId,
                posterId,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log('like post success = ' + res.success)
                // if the post was liked successfully, update allPosts in state
                if (res.success) {
                    getAllPosts();
                } else {
                    // failed to like post
                    dispatch(postFailure(res))
                }
            })
    }
}

// attempts to unlike the specified post for the given user
export function unlikePost(unlikerId, postId, posterId) {
    console.log(unlikerId + ' is attempting to unlike a post from... ' + posterId);
    return function (dispatch) {
        return fetch(`http://localhost:5000/posts/unlike`, {
            method: 'DELETE',
            body: JSON.stringify({
                unlikerId,
                postId,
                posterId,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log('unlike post success = ' + res.success)
                // if the post was unliked successfully, update allPosts in state
                if (res.success) {
                    getAllPosts();
                } else {
                    // failed to unlike post
                    dispatch(postFailure(res))
                }
            })
    }
}