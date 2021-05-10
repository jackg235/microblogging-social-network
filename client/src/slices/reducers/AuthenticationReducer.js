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
    blocking: [],
    blockedBy: [],
    suggestedUsers: [],
    posts: [],
    failedLogins: 0,
    lockedOut: false,
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
            state.blocking = payload.blocking
            state.posts = payload.posts
            state.failedLogins = 0
            state.lockedOut = false
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
        getSuggestedUsersSuccess: (state, {
            payload
        }) => {
            state.suggestedUsers = payload
        },
        updateBlocking: (state, {
            payload
        }) => {
            state.blocking = payload
        },
        getBlockingSuccess: (state, {
            payload
        }) => {
            state.blocking = payload.blocking
            state.blockedBy = payload.blockedBy
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
    getSuggestedUsersSuccess,
    updateBlocking,
    getBlockingSuccess,
} = authSlice.actions

export default authSlice.reducer