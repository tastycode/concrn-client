import { AppNavigator } from "navigators/AppNavigator"
import { NavigationActions } from "react-navigation"
import * as types from "actions/types"

const initialState = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams("Splash"),
)

export const nav = (state = initialState, action) => {
  let nextState
  switch (action.type) {
    case types.ONBOARDING_COMPLETE:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: "Reporter" }),
        state,
      )
      break
    default:
      nextState = {
        ...state,
        ...AppNavigator.router.getStateForAction(action, state),
      }
  }
  return nextState
}
