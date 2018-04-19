import React from "react"
import { addNavigationHelpers, StackNavigator } from "react-navigation"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import styled from "styled-components"

import Map from "components/reporter/Map"
import PromptHarm from "components/reporter/PromptHarm"

const Menu = styled(Icon)`
  padding: 5px;
`

const ReporterNavigator = StackNavigator(
  {
    map: { screen: Map },
    promptHarm: { screen: PromptHarm },
  },
  {
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Menu
            name="menu"
            size={30}
            color="#fff"
            onPress={() => navigation.navigate("DrawerOpen")}
          />
        ),
        title: "Concrn",
        headerStyle: { backgroundColor: "#8a6de9" },
        headerTitleStyle: { color: "#ffffff" },
      }
    },
  },
)

export default ReporterNavigator
