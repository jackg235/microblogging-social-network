import {
    createSlice
} from '@reduxjs/toolkit'

export const initialState = {
    authenticated: false,
    error: null,
    email: '',
    first: '',
    last: '',
    username: '',
    following: [],
    followers: [],
    blockedBy: [],
    posts: []
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, {
            payload
        }) => {
            state.authenticated = true
            state.first = payload.first
            state.last = payload.last
            state.email = payload.email
            state.username = payload.username
            state.posts = payload.posts
            state.followers = payload.followers
            state.following = payload.following
            state.blockedBy = payload.blockedBy
            state.posts = payload.posts
        },
        loginFailure: (state, {
            payload
        }) => {
            state.authenticated = false
            state.error = payload.err
        },
        registrationSuccess: (state, {
            payload
        }) => {
            state.authenticated = true
            state.first = payload.first
            state.last = payload.last
            state.email = payload.email
            state.username = payload.username
            state.posts = payload.posts
            state.followers = payload.followers
            state.following = payload.following
            state.blockedBy = payload.blockedBy
            state.posts = payload.posts
        },
        registrationFailure: (state, {
            payload
        }) => {
            state.error = payload.err
        },
        logoutUser: (state) => {
            state.authenticated = false
        },
        authenticateSuccess: (state, {
            payload
        }) => {
            state.authenticated = true
            state.first = payload.first
            state.last = payload.last
            state.email = payload.email
            state.username = payload.username
        },
        authenticateFailure: (state) => {
            state.authenticated = false
        },
        followSuccess: (state, {
            payload
        }) => {
            state.following = payload
        },
        followFailure: (state, {
            payload
        }) => {
            state.error = payload.err
        },
        getBlockedBySuccess: (state, {
            payload
        }) => {
            state.blockedBy = payload
        },
        getContactsSuccess: (state, {
            payload
        }) => {
            state.following = payload.following
            state.followers = payload.followers
        },
    }
})
export const {
    loginSuccess,
    loginFailure,
    registrationSuccess,
    registrationFailure,
    logoutUser,
    authenticateSuccess,
    authenticateFailure,
    followSuccess,
    followFailure,
    getBlockedBySuccess,
    getContactsSuccess,
} = authSlice.actions

export default authSlice.reducer