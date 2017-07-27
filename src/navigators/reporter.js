import React from 'react';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import Map from 'components/reporter/map'
import Chat from 'components/reporter/chat'


const ReporterNavigator = StackNavigator({
  map: { screen: Map },
  chat: { screen: Chat }
}, {
  navigationOptions: {
    title: 'Concrn',
    headerStyle: { backgroundColor: '#8a6de9' },
    headerTitleStyle: { color: '#ffffff' }
  }
})

export default ReporterNavigator
