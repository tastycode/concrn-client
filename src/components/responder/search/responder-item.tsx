import React from "react"
import { Text, View, TouchableHighlight } from "react-native"
import styled from "styled-components"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

const CellContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 5px 10px 5px 0;
`
const ResponderInfo = styled.View`
  flex: 1;
`

const Avatar = styled(Icon)`
  padding: 10px;
`

export default ({ responder, ...props }) => {
  return (
    <TouchableHighlight {...props}>
      <CellContainer key={responder.id}>
        <Avatar name="account" size={30} color="#000000" />
        <ResponderInfo>
          <Text>{responder.name}</Text>
          <Text>{responder.lastLogin}</Text>
        </ResponderInfo>
        <Text>{responder.distance}</Text>
      </CellContainer>
    </TouchableHighlight>
  )
}
