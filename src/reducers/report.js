import createReducer from "lib/createReducer"
import * as types from "actions/types"

export const report = createReducer(
  {
    messages: [],
  },
  {
    [types.REPORT_STORE](state, action) {
      return {
        ...state,
        reportId: action.reportId,
      }
    },
    [types.REPORT_MESSAGE_RECEIVED](state, action) {
      return {
        ...state,
        messages: [...state.messages, action.message],
      }
    },
  },
)
