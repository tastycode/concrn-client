import React from "react"
import {
  Container,
  Content,
  H1,
  Text,
  Button,
  Footer,
  FooterTab,
  Form,
  Input,
  Item,
  Label,
} from "native-base"
import { View } from "react-native"
import styled from "styled-components"
import { connect } from "react-redux"
import * as types from "actions/types"
import { reduxForm, Field } from "redux-form"
import DeviceInfo from "react-native-device-info"

const FormControls = styled.View`
  padding-top: 30px;
`

const FormItem = styled(Item)`
  padding-top: 20px;
`

const TopPaddedView = styled(View)`
  padding-top: 20px;
`

const renderField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <Item>
    <Input
      placeholder={label}
      {...input}
      {...custom}
      style={{ color: "#ffffff" }}
      placeholderTextColor="#dfdfdf"
    />
  </Item>
)

const OnboardingProfile = ({ handleSubmit }) => {
  const onSubmit = (values, dispatch) => {
    let deviceId = DeviceInfo.getUniqueID()
    dispatch({
      type: types.AUTH_REQUEST,
      payload: {
        ...values,
        deviceId,
      },
    })
  }

  return (
    <Container>
      <Content
        padder
        contentContainerStyle={styles.onboardContentContainer}
        style={styles.onboardContent}
      >
        <TopPaddedView />
        <Text padder style={styles.onboardText}>
          We need your name and number to follow up with your reports
        </Text>
        <FormControls>
          <Field name="name" component={renderField} label="Name" />
          <Field
            name="phone"
            component={renderField}
            onSubmitEditing={() => handleSubmit(onSubmit)}
            label="Phone Number"
          />
        </FormControls>
      </Content>
      <Footer>
        <FooterTab>
          <Button full onPress={handleSubmit(onSubmit)}>
            <Text>Next</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  )
}

const styles = {
  container: {
    paddingTop: "20",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  onboardContentContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
  },
  onboardText: {
    color: "#fff",
  },
  onboardContent: {
    backgroundColor: "#57367F",
  },
}

export default reduxForm({
  form: "reporter",
})(OnboardingProfile)
