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
    getBlockedBySuccess,
    getContactsSuccess,
    getSuggestedUsersSuccess,
    accountLockout,
    accountUnlocked,
} from '../reducers/AuthenticationReducer'

import {
    updateFollowers,
    updateFollowing,
    getUserFailure,
} from '../reducers/UserReducer'
import {getUser} from './UserActions'

// attempts to login a user
export function login(email, password, failedLogins) {
    console.log('attempting to login user... ' + email)
    return function (dispatch) {
        return fetch(`/verifyLogin`, {
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
                    if (failedLogins > 1) {
                        dispatch(accountLockout(res))
                    } else {
                        dispatch(loginFailure(res))
                    }
                }
            })
    }
}

// registers a new user
export function register(email, password, first, last, username) {
    console.log('attempting to register user... ' + email)
    return function (dispatch) {
        return fetch(`/verifyRegister`, {
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
        return fetch(`/users/follow`, {
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

// attempts to block/unblock the specified user
export function blockToggle(username, userToBlock) {
    console.log(username + ' is attempting to block/unblock... ' + userToBlock)
    return function (dispatch) {
        return fetch(`/users/block`, {
            method: 'POST',
            body: JSON.stringify({
                username,
                userToBlock,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log('block user error = ' + res.err)
                // if blocking the user was successful, update home and profile pages
                if (!res.err) {
                    console.log('block user res.data... ')
                    console.log(res.data)
                    dispatch(updateFollowing(res.data))
                } else {
                    // failed to block user
                    dispatch(followFailure(res))
                }
            })
    }
}

// attempts to get the users that block the logged in user
export function getBlockers(username) {
    console.log('searching for users that block ' + username)
    return function (dispatch) {
        return fetch(`/users/blockers/${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log('get blockers error = ' + res.err)
                // if blockers were retrieved successfully, update them in state
                if (!res.err) {
                    console.log('get blockers res.data... ')
                    console.log(res.data)
                    dispatch(getBlockedBySuccess(res.data))
                } else {
                    // failed to get blockers
                    dispatch(followFailure(res))
                }
            })
    }
}

// attempts to get the specified user's following and followers
export function getContacts(username) {
    console.log('attempting to get the contacts of user... ' + username)
    return function (dispatch) {
        return fetch(`users/contacts/` + username, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log('get user contacts error = ' + res.err)
                // if getting the user's contacts was successful, add the contact data to state
                if (!res.err) {
                    console.log(res.data)
                    dispatch(getContactsSuccess(res.data));
                } else {
                    // failed to get user's contacts
                    dispatch(followFailure(res))
                }
            })
    }
}

// attempts to get suggested users for the specified user
export function getSuggested(username) {
    console.log('attempting to get suggested users for user... ' + username)
    return function (dispatch) {
        return fetch(`users/suggested/` + username, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log('get suggested users error = ' + res.err)
                // if getting the suggested users for this user was successful, add the suggested data to state
                if (!res.err) {
                    console.log(res.data)
                    dispatch(getSuggestedUsersSuccess(res.data));
                } else {
                    // failed to get user's suggested users
                    dispatch(followFailure(res))
                }
            })
    }
}

// logs out a user by removing the token from localStorage
export function unlockLoginForm() {
    return function (dispatch) {
        dispatch(accountUnlocked())
    }
}