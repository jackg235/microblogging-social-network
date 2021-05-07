// attempts to create a new blog post
import {
    getPostFailure,
    getPostSuccess,
    postFailure,
    postSuccess,
    getUserPostsSuccess,
    getUserPostsFailure,
    getCommentsSuccess,
    getCommentsFailure
} from "../reducers/PostReducer";

export function createPost(title, content, username) {
    console.log('attempting to create a post called... ' + title + ' by... ' + username)
    console.log(content)
    return function (dispatch) {
        const likes = [];
        const comments = [];
        return fetch(`/posts/new`, {
            method: 'POST',
            body: JSON.stringify({
                title,
                content,
                username,
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
                console.log('create post error = ' + res.err)
                console.log('post: ')
                console.log(res.data)
                // if the post was created successfully, update allPosts in state
                if (res.err) {
                    // failed to create post
                    dispatch(postFailure(res))
                } else {
                    // dispatch(postSuccess());
                    dispatch(getAllPosts(username))
                }
            })
    }
}

// attempts to delete the blog post with the specified title
export function deletePost(username, postId) {
    console.log('attempting to delete a post with id... ' + postId + ' by... ' + username)
    return function (dispatch) {
        return fetch(`/posts/delete`, {
            method: 'DELETE',
            body: JSON.stringify({
                username,
                postId,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log('delete post error = ' + res.err)
                // if the post was deleted successfully, update allPosts in state
                if (res.err) {
                    // failed to delete post
                    dispatch(postFailure(res))
                } else {
                    // update home feed to not have deleted post
                    dispatch(getAllPosts(username));
                    // in case post was deleted from profile page
                    dispatch(getUserPosts(username, username))
                }
            })
    }
}

// attempts to get the specified blog post
export function getPost(postId) {
    console.log('attempting to get a post with id... ' + postId)
    return function (dispatch) {
        return fetch(`/posts/get/${postId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log('get post error = ' + res.err)
                // if the post was retrieved successfully, set the error to null
                if (res.err) {
                    // failed to get post
                    dispatch(getPostFailure(res))
                } else {
                    dispatch(getPostSuccess());
                }
            })
    }
}

// attempts to get posts from users the current user follows
export function getAllPosts(username) {
    console.log('attempting to get posts that ' + username + ' follows... ')
    return function (dispatch) {
        return fetch(`/posts/getPosts/${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log('get posts error = ' + res.err)
                // if all the posts were retrieved successfully, update allPosts
                if (res.err) {
                    // failed to create post
                    dispatch(postFailure(res))
                } else {
                    console.log('following posts res.data is: ' + res.data);
                    dispatch(postSuccess(res.data));
                    // dispatch(getComments())
                }
            })
    }
}

// attempts to get all blog posts from specified user
export function getUserPosts(username, profileUser) {
    console.log('attempting to get posts from... ' + profileUser)
    return function (dispatch) {
        return fetch(`/posts/getUserPosts/${username}&${profileUser}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log('get user posts error = ' + res.err)
                // if all the posts were retrieved successfully, update profileUserPosts
                if (res.err) {
                    // failed to create post
                    dispatch(getUserPostsFailure(res))
                } else {
                    console.log('user posts res.data is: ' + res.data);
                    dispatch(getUserPostsSuccess(res.data));
                    // dispatch(getComments())
                }
            })
    }
}

// attempts to add a comment on the specified post
export function addComment(commenterId, content, postId, posterId) {
    console.log('attempting to add a comment from... ' + commenterId + ' on post with id... ' + postId);
    return function (dispatch) {
        return fetch(`/posts/addComment`, {
            // should this be changed to a put or patch maybe?
            method: 'POST',
            body: JSON.stringify({
                commenterId,
                content,
                postId,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log('add comment error = ' + res.err)
                console.log(res)
                // if the comment was posted successfully, update allPosts in state
                if (res.err) {
                    // failed to add comment to post
                    dispatch(postFailure(res))
                } else {
                    // updates home page posts with new comment
                    dispatch(getAllPosts(commenterId));
                    // in case comment was added on profile page
                    dispatch(getUserPosts(commenterId, posterId))
                }
            })
    }
}

// attempts to delete a comment on the specified post
export function deleteComment(commenterId, commentId, postId, posterId) {
    console.log('attempting to delete a comment from... ' + commenterId + ' on a post by... ' + posterId);
    return function (dispatch) {
        return fetch(`/posts/deleteComment`, {
            method: 'DELETE',
            body: JSON.stringify({
                postId,
                commentId,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log('delete comment error = ' + res.err)
                // if the comment was deleted successfully, update allPosts in state
                if (res.err) {
                    // failed to delete comment from post
                    dispatch(postFailure(res))
                } else {
                    // updates home page posts without deleted comment
                    dispatch(getAllPosts(commenterId))
                    // in case comment was deleted from profile page
                    dispatch(getUserPosts(commenterId, posterId))
                }
            })
    }
}

// attempts to hide the specified post for the given user
export function hidePost(username, postId, posterId) {
    console.log(username + ' is attempting to hide a post from... ' + posterId);
    return function (dispatch) {
        return fetch(`/posts/hide`, {
            // should this be changed to a put or patch maybe?
            method: 'POST',
            body: JSON.stringify({
                username,
                postId,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log('hide post error = ' + res.err)
                // if the post was hidden successfully, update allPosts in state
                if (res.err) {
                    // failed to hide post
                    dispatch(postFailure(res))
                } else {
                    dispatch(getAllPosts(username))
                    // if user hid post from profile page
                    dispatch(getUserPosts(username, posterId))
                }
            })
    }
}

// attempts to like the specified post for the given user
export function likePost(username, postId, posterId) {
    console.log(username + ' is attempting to like a post from... ' + posterId);
    return function (dispatch) {
        return fetch(`/posts/like`, {
            // should this be changed to a put or patch maybe?
            method: 'POST',
            body: JSON.stringify({
                username,
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
                console.log('like post error = ' + res.err)
                // if the post was liked successfully, update allPosts in state
                if (res.err) {
                    // failed to like post
                    dispatch(postFailure(res))
                } else {
                    dispatch(getAllPosts(username))
                    // if user liked post from profile page
                    dispatch(getUserPosts(username, posterId))
                }
            })
    }
}

// attempts to unlike the specified post for the given user
export function unlikePost(unlikerId, postId, posterId) {
    console.log(unlikerId + ' is attempting to unlike a post from... ' + posterId);
    return function (dispatch) {
        return fetch(`/posts/unlike`, {
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
                console.log('unlike post error = ' + res.err)
                // if the post was unliked successfully, update allPosts in state
                if (res.err) {
                    // failed to unlike post
                    dispatch(postFailure(res))
                } else {
                    dispatch(getAllPosts(unlikerId))
                }
            })
    }
}

// DELETE THIS
// attempts to get all post comments from db
export function getComments() {
    console.log('attempting to get comments from backend...')
    return function (dispatch) {
        return fetch(`/posts/getComments`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log('get comments error = ' + res.err)
                console.log(res)
                // if the comments were retrieved successfully, set the error to null
                if (res.err) {
                    // failed to get comments
                    dispatch(getCommentsFailure(res))
                } else {
                    console.log('all comments res.data is: ' + res.data);
                    dispatch(getCommentsSuccess(res.data));
                }
            })
    }
}
