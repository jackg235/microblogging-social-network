import {
    createSlice
} from '@reduxjs/toolkit'

export const initialState = {
    allUsers: [],
    profileUser: {
        first: "",
        last: "",
        email: "",
        password: "",
        username: "",
        registrationDate: null,
        following: [],
        followers: [],
        posts: [],
        img: {
            data: null,
            contentType: "",
        },
    },
    error: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUserSuccess: (state, {
            payload
        }) => {
            state.profileUser = payload
        },
        getUserFailure: (state, {
            payload
        }) => {
            state.profileUser = {};
            state.error = payload.err
        },
        getAllUsersSuccess: (state, {
            payload
        }) => {
            state.allUsers = payload
        },
        getAllUsersFailure: (state, {
            payload
        }) => {
            state.allUsers = []
            state.error = payload.err
        },
        updateFollowers: (state, {
            payload
        }) => {
            state.profileUser.followers = payload
        },
        updateFollowing: (state, {
            payload
        }) => {
            state.profileUser.following = payload
        },
    }
})
export const {
    getUserSuccess,
    getUserFailure,
    getAllUsersSuccess,
    getAllUsersFailure,
    updateFollowers,
    updateFollowing,
} = userSlice.actions

export default userSlice.reducer