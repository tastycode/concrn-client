import { AppNavigator } from 'navigators/AppNavigator'

import { NavigationActions } from 'react-navigation';
import * as types from 'actions/types'
import createReducer from 'lib/createReducer'


const firstAction = AppNavigator.router.getActionForPathAndParams('Splash');
const firstState = AppNavigator.router.getStateForAction(firstAction);

export const nav = function nav(state = firstState, action) {
  let nextState;
  switch (action.type) {
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

