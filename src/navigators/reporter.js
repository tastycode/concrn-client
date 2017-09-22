import React from 'react';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import { Icon } from 'native-base'

import Map from 'components/reporter/map'
import Chat from 'components/reporter/chat'


const ReporterNavigator = StackNavigator({
  map: { screen: Map },
  chat: { screen: Chat }
}, {
  navigationOptions: ({navigation}) => {
    return {
      headerLeft: (<Icon name="menu" size={35} onPress={ () => navigation.navigate('DrawerOpen') } />),
      title: 'Concrn',
      headerStyle: { backgroundColor: '#8a6de9' },
      headerTitleStyle: { color: '#ffffff' }
    }
  }
})

export default ReporterNavigator
