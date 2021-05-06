import {
    createSlice
} from '@reduxjs/toolkit'

export const initialState = {
    rooms: []
}

const streamSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        failure: (state, {
            payload
        }) => {
            state.err = payload.err
        },
        getStreamsSuccess: (state, {
            payload
        }) => {
            state.rooms = payload
        },
        startStreamSuccess: (state, {
            payload
        }) => {
        },
        endStreamSuccess: (state, {
            payload
        }) => {
        },
    }
})
export const {
    failure,
    getStreamsSuccess,
    startStreamSuccess,
    endStreamSuccess
} = streamSlice.actions

export default streamSlice.reducer