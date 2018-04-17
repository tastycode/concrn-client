import OnboardingComponent from "./OnboardingComponent"
import React from "react"
import { Image } from "react-native"

const OnboardingNext = OnboardingComponent({
  title: "Use Concrn when someone is sad or scared",
  subtitle:
    "When someone is crying, lost,  frightened, or confused, Concrn responders are trained to listen, help them feel safe, and help them find services to help.",
  ctaText: "When to use concrn",
  ctaNext: "When3",
  image: () => (
    <Image
      style={{ width: 200, height: 200 }}
      source={require("images/onboarding-when.png")}
    />
  ),
})

export default OnboardingNext
