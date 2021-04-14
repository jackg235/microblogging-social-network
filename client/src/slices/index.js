import {combineReducers} from 'redux'
import postReducer from './reducers/PostReducer'
import authReducer from './reducers/AuthenticationReducer'
import videoReducer from './reducers/VideoReducer'
import UserReducer from './reducers/UserReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    video: videoReducer,
    posts: postReducer,
    users: UserReducer,
})

export default rootReducer