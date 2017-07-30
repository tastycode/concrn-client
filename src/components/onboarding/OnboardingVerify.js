
import React from 'react'
import { Container, Content, H1, Text, Button, Footer, FooterTab, Form, Input, Item, Label} from 'native-base'
import { connect } from 'react-redux'
import * as types from 'actions/types'
import { reduxForm, Field } from 'redux-form'
import { verify } from 'actions/onboarding'


const renderField = ({input, label, meta: { touched, error}, ...custom}) => (
  <Item floatingLabel>
    <Label style={{color: '#ffffff'}}>{label}</Label>
    <Input {...input} {...custom}/>
  </Item>
)

const OnboardingVerify = ({error, handleSubmit}) => {
  const onSubmit = (values, dispatch) => {
    dispatch(verify({
      ...values
    }))
  }

  return (
    <Container>
      <Content padder contentContainerStyle={styles.onboardContentContainer} style={styles.onboardContent}>
        <Text style={styles.onboardText}>We've sent you a text with a 4-digit code, Enter it here to continue</Text>
        <Field
          name="code"
          component={renderField}
          onSubmitEditing={() => handleSubmit(onSubmit)}
          label="Verification Code"/>
        {error && <Text>{error}</Text>}
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


const mapStateToProps = (state) => {
  return {
    error: state.auth.error
  }
}

const ConnectedOnboardingVerify = connect(mapStateToProps)(OnboardingVerify)

export default reduxForm({
  form: 'verify'
})(ConnectedOnboardingVerify)
