import React from 'react';
import { Button } from 'react-native'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, DrawerNavigator, StackNavigator } from 'react-navigation';
import DrawerContent from 'components/nav/drawer'
import * as types from 'actions/types'

import OnboardingNavigator from 'navigators/onboarding'
import ReporterNavigator from 'navigators/reporter'
import ResponderNavigator from 'navigators/responder'
import { View, Text } from 'react-native'

export const AppNavigator = DrawerNavigator({
  Onboarding: { screen: OnboardingNavigator },
  Reporter: { screen: ReporterNavigator },
  Responder: { screen: ResponderNavigator }
}, {
  contentComponent: DrawerContent,
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
