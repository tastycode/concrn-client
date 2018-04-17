import React from "react"
import { connect } from "react-redux"
import styled from "styled-components/native"
import { View, Text, Switch } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import * as types from "actions/types"
import * as R from "ramda"
import * as responderActions from "actions/responder"

const DrawerOuterContainer = styled.View`
  flex: 1;
  justify-content: center;
`

const DrawerInnerContainer = styled.View`
  align-items: flex-start;
`

const Item = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 20px;
  align-items: center;
`

const ItemIcon = styled(Icon)`
  padding-right: 15px;
`

const ItemLabel = styled.Text`
  font-size: 18px;
  flex: 1;
`

const Drawer = ({ isResponder, navigation }) => {
  const { dispatch } = navigation
  const toggleResponder = value => {
    if (value) {
      dispatch(responderActions.validate())
    }
  }

  return (
    <DrawerOuterContainer>
      <DrawerInnerContainer>
        <Item>
          <ItemIcon name="crosshairs-gps" size={24} />
          <ItemLabel>Report Crisis</ItemLabel>
        </Item>
        <Item>
          <ItemIcon name="note-multiple-outline" size={24} />
          <ItemLabel>My Reports</ItemLabel>
        </Item>
        <Item>
          <ItemIcon name="gift" size={24} />
          <ItemLabel>Contribute</ItemLabel>
        </Item>
        <Item>
          <ItemIcon name="help-circle" size={24} />
          <ItemLabel>Help</ItemLabel>
        </Item>
        <Item>
          <ItemIcon name="phone-settings" size={24} />
          <ItemLabel>Responder</ItemLabel>
          <Switch value={isResponder} onValueChange={toggleResponder} />
        </Item>
      </DrawerInnerContainer>
    </DrawerOuterContainer>
  )
}

export default connect(state => {
  return {
    isResponder: R.pipe(R.path(["auth", "responderId"]), R.isNil(), R.not())(
      state
    )
  }
})(Drawer)
