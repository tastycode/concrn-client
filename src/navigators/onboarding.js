import React from 'react';
import { Button } from 'react-native'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import * as types from 'actions/types'

import SplashScreen from 'components/nav/Splash'
import OnboardingWelcome from 'components/onboarding/OnboardingWelcome'
import OnboardingWhen from 'components/onboarding/OnboardingWhen'
import OnboardingWhen3 from 'components/onboarding/OnboardingWhen3'
import OnboardingProfile from 'components/onboarding/OnboardingProfile'

export const OnboardingNavigator = StackNavigator({
  Welcome: { screen: OnboardingWelcome },
  When: { screen: OnboardingWhen },
  When3: { screen: OnboardingWhen3 },
  Profile: { screen: OnboardingProfile }
});

OnboardingNavigator.navigationOptions = {
  header: null,
}

export default OnboardingNavigator
