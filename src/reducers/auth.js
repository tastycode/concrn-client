import createReducer from 'lib/createReducer'
import * as types from 'actions/types'

export const auth = createReducer({
  role: 'responder'
}, {
  [types.ONBOARDING_STORE](state, action) {
    return {
      ...state,
      ...action
    }
  },
  [types.ONBOARDING_FAIL](state, action) {
    return {
      ...state,
      ...action
    }
  }
})
