import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import * as navigationReducer from './navigation'
import * as authReducer from './auth'
import * as mapReducer from './map'
import * as reportReducer from './report'

export default combineReducers({
  ...navigationReducer,
  ...authReducer,
  ...mapReducer,
  ...reportReducer,
  form: formReducer
})
