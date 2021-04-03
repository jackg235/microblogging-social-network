import {
    createSlice
} from '@reduxjs/toolkit'
import TokenManagement from '../TokenManagement'

export const initialState = {
    postsError: null,
    allPosts: [],
    // do we need to keep state for getPost? like a currPost?
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postSuccess: (state, {
            payload
        }) => {
            state.allPosts = payload
            state.postsError = null
        },
        postFailure: (state, {
            payload
        }) => {
            state.postsError = payload.err
        },
        getPostSuccess: (state) => {
            state.postsError = null
        },
        getPostFailure: (state, {
            payload
        }) => {
            state.postsError = payload.err
        },
    }
})
export const {
    postSuccess,
    postFailure,
    getPostSuccess,
    getPostFailure,
} = postsSlice.actions

export default postsSlice.reducer