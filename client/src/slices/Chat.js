import {
    createSlice
} from '@reduxjs/toolkit'
import TokenManagement from '../TokenManagement'

export const initialState = {
    token: null
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        tokenRetrieveSuccess: (state, {
            payload
        }) => {
            state.token = payload.token
        },
        tokenRetrieveFailure: (state, {
            payload
        }) => {
            state.error = payload.err
        },
    }
})
export const {
    tokenRetrieveSuccess,
    tokenRetrieveFailure
} = authSlice.actions

// get a video chat token
export function getVideoChatToken(username, room) {
    console.log('attempting to add user ' + username + ' to room ' + room)
    return function(dispatch) {
        return fetch(`http://localhost:5000/video/token`, {
                method: 'POST',
                body: JSON.stringify({
                    identity: username,
                    room: room
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(res => res.json())
            .then(res => {
                console.log('get a video chat token success = ' + res.success)
                if (res.success) {
                    dispatch(tokenRetrieveSuccess(res));
                } else {
                    dispatch(tokenRetrieveFailure(res))
                }
            })
    }
}

export default authSlice.reducer