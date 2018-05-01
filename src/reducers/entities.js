import R from "ramda"

import createReducer from "lib/createReducer"
import * as types from "actions/types"

export const entities = createReducer(
  {},
  {
    [types.ENTITIES_RECEIVED](state, action) {
      const { entities, type, windowName } = action.payload
      const entitiesById = R.indexBy(R.prop("id"), entities)
      const entityIds = R.map(R.prop("id"), entities)
      const nextState = {
        ...state,
      }
      if (nextState[type] === undefined) {
        nextState[type] = {
          byId: {},
          windows: [],
        }
      }
      nextState[type].byId = {
        ...R.path([type, "byId"])(nextState),
        ...entitiesById,
      }
      nextState[type].windows = R.uniq([...nextState[type].windows, windowName])
      nextState[type][windowName] = {
        ids: entityIds,
      }
      return nextState
    },
  },
)
