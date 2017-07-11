import React from 'react'
import { Container, Content, H1, Text, Button, Footer, FooterTab } from 'native-base'

const OnboardingComponent = function({title, subtitle, ctaText, ctaNext, image}) {
  return ({navigation}) => (
    <Container>
      <Content padder contentContainerStyle={styles.onboardContentContainer} style={styles.onboardContent}>
        {image && image()}
        <H1 style={styles.onboardText}>{title}</H1>
        <Text style={styles.onboardText}>{subtitle}</Text>
      </Content>
      <Footer>
        <FooterTab>
          <Button full onPress={() => navigation.navigate(ctaNext)}>
            <Text>{ctaText}</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  )
}

OnboardingComponent.navigationOptions = {
  header: null
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  onboardContentContainer: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'column',
    alignItems: 'center',
  },
  onboardText: {
    color: '#fff'
  },
  onboardContent: {
    backgroundColor: '#57367F'
  }
};

export default OnboardingComponent;
