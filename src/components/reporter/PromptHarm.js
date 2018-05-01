import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import styled from "styled-components"
import { color, typeSize, typeWeight } from "styles/constants"
import { connect } from "react-redux"
import R from "ramda"
import * as types from "actions/types"

const PromptContainer = styled(View)`
  background-color: ${color.plum};
  flex: 1;
`
const PromptText = styled(Text)`
  flex: 1;
  font-size: ${typeSize.l3};
  line-height: 28px;
  padding: 20px;
  padding-right: 100px;
  color: white;
`

const PromptButton = ({ text, ...props }) => {
  const Container = styled(TouchableOpacity)`
    background-color: ${color.plumBright};
    shadow-color: black;
    shadow-opacity: 0.16;
    shadow-radius: 10px;
    shadow-offset: 0px 2px;

    border-radius: 3px;
    padding: 15px;
    min-width: 150px;
  `
  const Contents = styled(Text)`
    color: white;
    text-align: center;
    font-size: ${typeSize.m};
    font-weight: ${typeWeight.semibold};
  `
  return (
    <Container {...props}>
      <Contents>{text}</Contents>
    </Container>
  )
}

const PromptButtonsContainer = styled(View)`
  flex-direction: row;
  justify-content: space-around;
  padding: 10px;
`

const PromptHarm = ({ updateReport, dispatch, navigation }) => {
  const moveToEmergency = () => {
    dispatch({
      type: types.REPORT_STORE,
      payload: {
        isHarmImmediate: false,
      },
    })
    navigation.navigate("harmEmergency")
  }

  const moveToNotes = () => {
    dispatch({
      type: types.REPORT_STORE,
      payload: {
        isHarmImmediate: false,
      },
    })
    navigation.navigate("promptNotes")
  }

  return (
    <PromptContainer>
      <PromptText>
        Is anyone at risk of immediate harm to themselves or others?
      </PromptText>
      <PromptButtonsContainer>
        <PromptButton text="YES" onPress={moveToEmergency} />
        <PromptButton text="NO" onPress={moveToNotes} />
      </PromptButtonsContainer>
    </PromptContainer>
  )
}

export default connect(null)(PromptHarm)
