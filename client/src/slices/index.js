import { combineReducers } from 'redux'

import authReducer from './Authentification'

const rootReducer = combineReducers({
    auth : authReducer
})

export default rootReducer