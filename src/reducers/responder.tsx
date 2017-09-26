import { combineReducers } from 'redux'
import createReducer from 'lib/createReducer'
import * as types from 'actions/types'

const responderReducers = {
  partner: createReducer({}, {
    [types.RESPONDER_PARTNER_CHOSEN](state, action) {
      state = {
        ...action.responder
      }
      return state
    }
  }),
  isAvailable: createReducer(false, {
    [types.RESPONDER_AVAILABILITY_SET](state, action) {
      state = action.availability
      return state
    }
  })
}

export const responder = combineReducers(responderReducers)
