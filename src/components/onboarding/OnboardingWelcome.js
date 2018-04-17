import OnboardingComponent from "./OnboardingComponent"
import React from "react"
import { View } from "react-native"

const OnboardingWelcome = OnboardingComponent({
  title: "Welcome to Concrn",
  subtitle:
    "Call trained compassionate responders to help with neighborhood crises",
  ctaText: "Where to use Concrn",
  ctaNext: "When",
  image() {
    return <View />
  },
})

//<!--SvgUri width="200" height="200" source={require('images/logo.svg')}/-->
export default OnboardingWelcome
