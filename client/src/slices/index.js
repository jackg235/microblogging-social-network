import {combineReducers} from 'redux'
import postReducer from './Posts'
import authReducer from './reducers/AuthenticationReducer'
import videoReducer from './reducers/VideoReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    video: videoReducer,
    posts: postReducer,
})

export default rootReducer