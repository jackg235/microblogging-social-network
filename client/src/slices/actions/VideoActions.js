import {tokenRetrieveSuccess, tokenRetrieveFailure} from "../reducers/VideoReducer";

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
                    console.log(res)
                    dispatch(tokenRetrieveSuccess(res));
                } else {
                    dispatch(tokenRetrieveFailure(res))
                }
            })
    }
}