import React from 'react'
import { Container, Content, H1, Text, Button, Footer, FooterTab, Form, Input, Item, Label} from 'native-base'
import { connect } from 'react-redux'
import * as types from 'actions/types'

const OnboardingProfile = ({dispatch}) => {
  const finishOnboarding = () => dispatch({type: types.ONBOARDING_COMPLETE})

  return (
    <Container>
      <Content padder contentContainerStyle={styles.onboardContentContainer} style={styles.onboardContent}>
        <Text style={styles.onboardText}>We need your name and number to follow up with your reports</Text>
        <Form>
          <Item floatingLabel>
            <Label style={{color: '#ffffff'}}>Name</Label>
            <Input/>
          </Item>
          <Item floatingLabel>
            <Label style={{color: '#ffffff'}}>Phone Number</Label>
            <Input/>
          </Item>
        </Form>
      </Content>
      <Footer>
        <FooterTab>
          <Button full onPress={finishOnboarding}>
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

export default connect()(OnboardingProfile)
