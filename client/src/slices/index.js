import {combineReducers} from 'redux'

import authReducer from './Authentification'
import videoReducer from './Video'
import postReducer from './Posts'

const rootReducer = combineReducers({
    auth: authReducer,
    video: videoReducer,
    posts: postReducer,
})

export default rootReducer