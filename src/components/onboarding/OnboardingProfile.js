import React from 'react'
import { Container, Content, H1, Text, Button, Footer, FooterTab, Form, Input, Item, Label} from 'native-base'
import { connect } from 'react-redux'
import * as types from 'actions/types'
import { reduxForm, Field } from 'redux-form'
import DeviceInfo from 'react-native-device-info'
import { validate } from 'actions/onboarding'



const renderField = ({input, label, meta: { touched, error}, ...custom}) => (
  <Item floatingLabel>
    <Label style={{color: '#ffffff'}}>{label}</Label>
    <Input {...input} {...custom}/>
  </Item>
)

const OnboardingProfile = ({handleSubmit}) => {
  const onSubmit = (values, dispatch) => {
    let deviceId = DeviceInfo.getUniqueID()
    dispatch(validate({
      ...values,
      deviceId
    }))
  }

  return (
      <Container>
        <Content padder contentContainerStyle={styles.onboardContentContainer} style={styles.onboardContent}>
          <Text style={styles.onboardText}>We need your name and number to follow up with your reports</Text>
            <Field name="name" component={renderField} label="Name"/>
            <Field
              name="phone"
              component={renderField}
              onSubmitEditing={() => handleSubmit(onSubmit)}
              label="Phone Number"/>

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
    paddingTop: '20',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  onboardContentContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  onboardText: {
    color: '#fff'
  },
  onboardContent: {
    backgroundColor: '#57367F'
  }
};

export default reduxForm({
  form: 'reporter'
})(OnboardingProfile)
