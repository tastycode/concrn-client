import OnboardingComponent from "./OnboardingComponent"
import React from "react"
import { Image } from "react-native"

export default OnboardingComponent({
  title: `Use Concrn when you don't know who to call`,
  subtitle:
    "When you're concerned about someone but don't know how to help, Concrn responders can help navigate people to the services they need.",
  ctaText: "Next",
  ctaNext: "Profile",
  image: () => (
    <Image
      style={{ width: 200, height: 200 }}
      source={require("images/onboarding-when.png")}
    />
  ),
})
