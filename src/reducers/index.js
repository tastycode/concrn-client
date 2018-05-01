import { combineReducers } from "redux"
import { reducer as formReducer } from "redux-form"
import * as navigationReducer from "./navigation"
import * as authReducer from "./auth"
import * as mapReducer from "./map"
import * as reportReducer from "./report"
import * as responderReducer from "./responder"
import * as entitiesReducer from "./entities"

export default combineReducers({
  ...navigationReducer,
  ...authReducer,
  ...mapReducer,
  ...reportReducer,
  ...responderReducer,
  ...entitiesReducer,
  form: formReducer,
})
