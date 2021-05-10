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
    posts: [],
    failedLogins: 0,
    lockedOut: false,
    img: null
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
            state.failedLogins = 0
            state.lockedOut = false
            state.img = payload.img
        },
        loginFailure: (state, {
            payload
        }) => {
            state.authenticated = false
            state.error = payload.err
            state.failedLogins = state.failedLogins + 1
        },
        accountLockout: (state, {
            payload
        }) => {
            state.authenticated = false
            state.error = payload.err
            state.failedLogins = 0
            state.lockedOut = true
        },
        accountUnlocked: (state, {
            payload
        }) => {
            state.error = null
            state.failedLogins = 0
            state.lockedOut = false
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
            state.img = payload.img
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
            console.log(payload)
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
            state.img = payload.img

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
    accountLockout,
    accountUnlocked,
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