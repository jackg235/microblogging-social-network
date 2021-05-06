import {
    failure,
    getStreamsSuccess,
    startStreamSuccess,
    endStreamSuccess
} from '../reducers/StreamReducer'
import {postFailure} from "../reducers/PostReducer";
import {getAllPosts, getUserPosts} from "./PostActions";

export function startStream(roomName, host) {
    return function (dispatch) {
        return fetch(`/stream/start`, {
            method: 'PUT',
            body: JSON.stringify({
                roomName,
                host,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.err) {
                    dispatch(failure(res))
                } else {
                    dispatch(startStreamSuccess(res.data))
                }
            })
    }
}

export function getStreams() {
    return function (dispatch) {
        return fetch(`/streams/getAll`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.err) {
                    dispatch(failure(res))
                } else {
                    dispatch(getStreamsSuccess(res.data))
                }
            })
    }

}

export function endStream(roomName, user) {
    return function (dispatch) {
        return fetch(`/stream/end`, {
            method: 'DELETE',
            body: JSON.stringify({
                roomName,
                user,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.err) {
                    dispatch(failure(res))
                } else {
                    dispatch(endStreamSuccess(res.data))
                }
            })
    }
}