import React from "react"
import { addNavigationHelpers, StackNavigator } from "react-navigation"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import styled from "styled-components"

import MapComponent from "components/reporter/MapComponent"
import PromptHarm from "components/reporter/PromptHarm"
import HarmEmergency from "components/reporter/HarmEmergency"
import PromptNotes from "components/reporter/PromptNotes"
import ReportList from "components/reporter/ReportList"

const Menu = styled(Icon)`
  padding: 5px;
`

const ReporterNavigator = StackNavigator(
  {
    map: { screen: MapComponent },
    promptHarm: { screen: PromptHarm },
    harmEmergency: { screen: HarmEmergency },
    promptNotes: { screen: PromptNotes },
    reportList: { screen: ReportList },
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
