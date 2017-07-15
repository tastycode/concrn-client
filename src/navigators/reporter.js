import React from 'react';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import Map from 'components/reporter/map'
const ReporterNavigator = StackNavigator({
  map: { screen: Map }
}, {
  navigationOptions: {
    title: 'Concrn',
    headerStyle: { backgroundColor: '#8a6de9' },
    headerTitleStyle: { color: '#ffffff' }
  }
})

export default ReporterNavigator
