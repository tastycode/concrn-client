import { AppNavigator } from 'navigators/app'
import { NavigationActions } from 'react-navigation';
import * as types from 'actions/types'

export const nav = (state, action) => {
  let nextState
  switch(action.type) {
    case types.ONBOARDING_COMPLETE:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Reporter' }),
        state
      );
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state)
  }
  return nextState
}
