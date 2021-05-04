import TokenManagement from '../../TokenManagement'
import {
    loginSuccess,
    loginFailure,
    registrationSuccess,
    registrationFailure,
    logoutUser,
    authenticateSuccess,
    authenticateFailure,
    followSuccess,
    followFailure,
} from '../reducers/AuthenticationReducer'

import {
    updateFollowers,
    getUserFailure,
} from '../reducers/UserReducer'
import { getUser } from './UserActions'

// attempts to login a user
export function login(email, password) {
    console.log('attempting to login user... ' + email)
    return function (dispatch) {
        return fetch(`http://localhost:5000/verifyLogin`, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log('auth login error = ' + res.err)
                // if the login was successful, set the token in localStorage and add user data to state
                if (!res.err) {
                    TokenManagement.setToken(res.token)
                    const user = TokenManagement.getUser()
                    dispatch(loginSuccess(res.data));
                } else {
                    // failed login
                    dispatch(loginFailure(res))
                }
            })
    }
}

// registers a new user
export function register(email, password, first, last, username) {
    console.log('attempting to register user... ' + email)
    return function (dispatch) {
        return fetch(`http://localhost:5000/verifyRegister`, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
                first,
                last,
                username
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log('registration error = ' + res.err)
                // if the login was successful, set the token in localStorage and add user data to state
                if (!res.err) {
                    TokenManagement.setToken(res.token)
                    const user = TokenManagement.getUser()
                    dispatch(registrationSuccess(user))
                } else {
                    // registration failure
                    dispatch(registrationFailure(res))
                }
            })
    }
}

// logs out a user by removing the token from localStorage
export function logout() {
    return function (dispatch) {
        TokenManagement.removeToken()
        dispatch(logoutUser())
    }
}

// checks if a user is loggedIn
export function authenticate() {
    return function (dispatch) {
        const loggedIn = TokenManagement.loggedIn()
        console.log(loggedIn)
        if (loggedIn) {
            const user = TokenManagement.getUser()
            console.log("user in authenticate function is... ")
            console.log(user)
            dispatch(authenticateSuccess(user))
        } else {
            dispatch(authenticateFailure())
        }
    }
}

// attempts to follow/unfollow the specified user
export function followToggle(username, otherUserId) {
    console.log(username + ' is attempting to follow... ' + otherUserId)
    return function (dispatch) {
        return fetch(`http://localhost:5000/users/follow`, {
            method: 'POST',
            body: JSON.stringify({
                username,
                otherUserId,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log('follow user error = ' + res.err)
                // if following the user was successful, add the user data to state
                if (!res.err) {
                    console.log('follow user res.data... ')
                    console.log(res.data)
                    dispatch(followSuccess(res.data.following));
                    dispatch(updateFollowers(res.data.followers))
                } else {
                    // failed to follow user
                    dispatch(followFailure(res))
                    // send error to user reducer as well
                    dispatch(getUserFailure(res))
                }
            })
    }
}