import createReducer from "lib/createReducer"
import * as types from "actions/types"

export const map = createReducer(
  {
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  },
  {
    [types.REPORTER_MAP_REGION_CHANGED](state, action) {
      return {
        ...state,
        region: action.region,
      }
    },
  },
)
