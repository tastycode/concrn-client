import React from "react"
import { View, Text } from "react-native"
import { connect } from "react-redux"
import * as R from "ramda"

@connect(state => {
  return {
    isRegistered: R.path(["auth", "reporterId"])(state),
  }
})
export default class Splass extends React.Component {
  componentWillMount() {
    const { isRegistered, navigation } = this.props
    if (isRegistered) {
      navigation.navigate("map")
    } else {
      navigation.navigate("Welcome")
    }
  }

  render() {
    return <View />
  }
}
