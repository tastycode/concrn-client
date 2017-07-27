import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import * as navigationReducer from './navigation'
import * as authReducer from './auth'

export default combineReducers({
  ...navigationReducer,
  ...authReducer,
  form: formReducer
})
