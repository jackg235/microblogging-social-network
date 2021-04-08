import {
    createSlice
} from '@reduxjs/toolkit'

export const initialState = {
    authenticated: false,
    error: null,
    email: '',
    first: '',
    last: '',
    username: ''
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
        authenticateFailure: (state, {
            payload
        }) => {
            state.authenticated = false
        }
    }
})
export const {
    loginSuccess,
    loginFailure,
    registrationSuccess,
    registrationFailure,
    logoutUser,
    authenticateSuccess,
    authenticateFailure
} = authSlice.actions

export default authSlice.reducer