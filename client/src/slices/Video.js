import {
    createSlice
} from '@reduxjs/toolkit'

export const initialState = {
    token: null
}

const videoSlice = createSlice({
    name: 'video',
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
} = videoSlice.actions

// get a video chat token
export function getVideoChatToken(username, room) {
    console.log('attempting to add user ' + username + ' to room ' + room)
    return function (dispatch) {
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

export default videoSlice.reducer