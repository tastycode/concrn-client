import createReducer from "lib/createReducer"
import { combineReducers } from "redux"
import * as types from "actions/types"

export const auth = createReducer(
  { role: [] },
  {
    [types.ONBOARDING_STORE](state, action) {
      return {
        ...state,
        ...action,
      }
    },
    [types.ONBOARDING_FAIL](state, action) {
      return {
        ...state,
        ...action,
      }
    },
  },
)
