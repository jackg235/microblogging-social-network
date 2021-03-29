import {combineReducers} from 'redux'

import authReducer from './Authentification'
import videoReducer from './Video'

const rootReducer = combineReducers({
    auth: authReducer,
    video: videoReducer
})

export default rootReducer