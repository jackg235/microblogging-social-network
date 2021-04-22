import {
    createSlice
} from '@reduxjs/toolkit'

export const initialState = {
    postsError: null,
    userPostsError: null,
    allPosts: [],
    profileUserPosts: [],
    allComments: [],
    commentError: null,
    // do we need to keep state for getPost? like a currPost?
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postSuccess: (state, {
            payload
        }) => {
            state.allPosts = payload
            state.postsError = null
        },
        postFailure: (state, {
            payload
        }) => {
            state.postsError = payload.err
        },
        getPostSuccess: (state) => {
            state.postsError = null
        },
        getPostFailure: (state, {
            payload
        }) => {
            state.postsError = payload.err
        },
        getUserPostsSuccess: (state, {
            payload
        }) => {
            state.profileUserPosts = payload
            state.postsError = null
        },
        getUserPostsFailure: (state, {
            payload
        }) => {
            state.userPostsError = payload.err
        },
        getCommentsSuccess: (state, {
            payload
        }) => {
            state.allComments = payload
            state.commentError = null
        },
        getCommentsFailure: (state, {
            payload
        }) => {
            state.commentError = payload.err
        },
    }
})
export const {
    postSuccess,
    postFailure,
    getPostSuccess,
    getPostFailure,
    getUserPostsSuccess,
    getUserPostsFailure,
    getCommentsSuccess,
    getCommentsFailure,
} = postsSlice.actions

export default postsSlice.reducer