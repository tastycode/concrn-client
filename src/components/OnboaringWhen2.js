import OnboardingComponent from "./OnboardingComponent"
import React from "react"
import { Image } from "react-native"

const OnboardingNext = OnboardingComponent({
  title: "Use concrn when someone is angry or frustrated",
  subtitle:
    "When someone is threatening, frustrated, or incoherent, Concrn responders are trained to deescalate the situation and allow the person to regain control.",
  ctaText: "Next",
  ctaNext: "onboardingWhen3",
  image: () => (
    <Image
      style={{ width: 200, height: 200 }}
      source={require("../assets/onboarding-when2.png")}
    />
  ),
})

export default OnboardingNext
