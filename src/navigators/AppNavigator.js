import React from "react"
import { Button } from "react-native"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import {
  addNavigationHelpers,
  DrawerNavigator,
  StackNavigator,
} from "react-navigation"
import { View, Text } from "react-native"

import DrawerContent from "components/nav/Drawer"
import * as types from "actions/types"

import OnboardingNavigator from "navigators/OnboardingNavigator"
import ReporterNavigator from "navigators/ReporterNavigator"
import ResponderNavigator from "navigators/ResponderNavigator"

export const AppNavigator = DrawerNavigator(
  {
    Onboarding: { screen: OnboardingNavigator },
    Reporter: { screen: ReporterNavigator },
    Responder: { screen: ResponderNavigator },
  },
  {
    contentComponent: DrawerContent,
  },
)

export const AppWithNavigationState = ({ dispatch, nav, drawerOpen }) => {
  return (
    <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
  )
}

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  nav: state.nav,
})

export default connect(mapStateToProps)(AppWithNavigationState)
