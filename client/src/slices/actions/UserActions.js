import {
    getUserSuccess,
    getUserFailure,
    getAllUsersSuccess,
    getAllUsersFailure,
} from '../reducers/UserReducer'

// attempts to get the specified user
export function getUser(username) {
    console.log('attempting to get user... ' + username)
    return function (dispatch) {
        return fetch(`/users/` + username, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log('get user error = ' + res.err)
                // if getting the user was successful, add the user data to state
                if (!res.err) {
                    dispatch(getUserSuccess(res.data));
                } else {
                    // failed to get user
                    dispatch(getUserFailure(res))
                }
            })
    }
}

// attempts to get all usernames
export function getAllUsernames() {
    console.log('attempting to get all usernames for state... ')
    return function (dispatch) {
        return fetch(`/getAllUsers`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log('get all usernames error = ' + res.err)
                if (!res.err) {
                    console.log(res.data)
                    dispatch(getAllUsersSuccess(res.data));
                } else {
                    // failed to get user's suggested users
                    dispatch(getAllUsersFailure(res))
                }
            })
    }
}