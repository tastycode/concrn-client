import React from 'react';
import { Button } from 'react-native'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
const meow = 'foo'
import * as types from 'actions/types'

import SplashScreen from 'components/nav/Splash'

export const AppNavigator = StackNavigator({
  Splash: { screen: SplashScreen }
});

export const AppWithNavigationState = ({ dispatch, nav, drawerOpen }) => {
  return (
    <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
  );
}

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  nav: state.nav
});

export default connect(mapStateToProps)(AppWithNavigationState);
