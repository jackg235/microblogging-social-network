import TokenManagement from '../../TokenManagement'
import {
    loginSuccess,
    loginFailure,
    registrationSuccess,
    registrationFailure,
    logoutUser,
    authenticateSuccess,
    authenticateFailure
} from '../reducers/AuthenticationReducer'

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
                console.log('auth login success = ' + res.success)
                // if the login was successful, set the token in localStorage and add user data to state
                if (res.success) {
                    TokenManagement.setToken(res.token)
                    const user = TokenManagement.getUser()
                    dispatch(loginSuccess(user));
                } else {
                    // failed login
                    dispatch(loginFailure(res))
                }
            })
    }
}

// registers a new user
export function register(email, password, first, last) {
    console.log('attempting to register user... ' + email)
    return function (dispatch) {
        return fetch(`http://localhost:5000/verifyRegister`, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
                first,
                last
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log('registration success = ' + res.success)
                // if the login was successful, set the token in localStorage and add user data to state
                if (res.success) {
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
            dispatch(authenticateSuccess(user))
        } else {
            dispatch(authenticateFailure())
        }
    }
}