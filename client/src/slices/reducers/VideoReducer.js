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

export default videoSlice.reducer