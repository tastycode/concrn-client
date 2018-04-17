import React from "react"
import { StackNavigator } from "react-navigation"
import { Icon } from "native-base"
import { View, Text } from "react-native"

const About = () => (
  <View>
    <Text>About</Text>
  </View>
)
const Checklist = () => (
  <View>
    <Text>Checklist</Text>
  </View>
)
const ResponderMap = () => (
  <View>
    <Text>ResponderMap</Text>
  </View>
)

const ResponderNavigator = StackNavigator(
  {
    About: { screen: About }
  },
  {
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Icon
            name="menu"
            size={35}
            onPress={() => navigation.navigate("DrawerOpen")}
          />
        ),
        title: "Responder",
        headerStyle: { backgroundColor: "#8a6de9" },
        headerTitleStyle: { color: "#ffffff" }
      }
    }
  }
)

export default ResponderNavigator
