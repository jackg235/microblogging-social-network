import {combineReducers} from 'redux'
import postReducer from './reducers/PostReducer'
import authReducer from './reducers/AuthenticationReducer'
import videoReducer from './reducers/VideoReducer'
import UserReducer from './reducers/UserReducer'
import streamReducer from './reducers/StreamReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    video: videoReducer,
    posts: postReducer,
    users: UserReducer,
    stream: streamReducer
})

export default rootReducer