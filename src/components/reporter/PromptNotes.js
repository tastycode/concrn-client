import React from "react"
import R from "ramda"
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import { Field, reduxForm } from "redux-form"
import { connect } from "react-redux"
import styled from "styled-components"
import { color, typeSize, typeWeight } from "styles/constants"

import * as types from "actions/types"

const NotesContainer = styled.View`
  flex: 1;
`

const NotesText = styled.Text`
  flex: 1;
  background-color: ${color.plum};
  font-size: ${typeSize.l3};
  line-height: 28px;
  padding: 20px;
  padding-right: 100px;
  color: white;
`

const NotesTextInput = styled(TextInput)`
  font-size: ${typeSize.m};
  flex: 3
  padding: 20px;
  background-color: white;
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
const FinishReportButtonContainer = styled.View`
  background: white;
  padding: 20px;
`

const mapStateToProps = state => ({ report: state.report })

const renderPromptNotesForField = ({ input, ...props }) => {
  return <NotesTextInput multiline={true} {...input} />
}

const PromptNotes = ({ dispatch, report, handleSubmit }) => {
  const onSubmit = ({ reporterNotes }) => {
    const finalReport = {
      ...report,
      reporterNotes,
    }
    dispatch({
      type: types.REPORT_CREATE,
      payload: finalReport,
    })
  }
  return (
    <NotesContainer>
      <NotesText>What's going on?</NotesText>
      <Field
        label="Notes"
        name={"reporterNotes"}
        component={renderPromptNotesForField}
      />
      <FinishReportButtonContainer>
        <PromptButton text="Next" onPress={handleSubmit(onSubmit)} />
      </FinishReportButtonContainer>
    </NotesContainer>
  )
}

export default R.pipe(
  connect(mapStateToProps),
  reduxForm({ form: "reportPromptNotes" }),
)(PromptNotes)
