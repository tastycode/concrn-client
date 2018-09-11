import Geocoder from "react-native-geocoding"
import Config from "react-native-config"
const makeDebouncer = msBetween => {
  let lastCall
  let endOfThrottleTimer
  return () => {
    return new Promise((resolve, reject) => {
      const resolveBounce = () => {
        if (endOfThrottleTimer) {
          clearTimeout(endOfThrottleTimer)
        }
        lastCall = Date.now()
        resolve()
      }
      if (!lastCall) return resolveBounce()
      let timeSinceLastCall = Date.now() - lastCall
      if (timeSinceLastCall > msBetween) {
        resolveBounce()
      } else {
        if (endOfThrottleTimer) {
          clearTimeout(endOfThrottleTimer)
        }
        endOfThrottleTimer = setTimeout(resolveBounce, timeSinceLastCall)
      }
    })
  }
}

if (!Geocoder.isInit) {
  Geocoder.init(Config.GOOGLE_MAPS_GEOCODING_API_KEY)
}

const debouncer = makeDebouncer(2000)

export default async ({ latitude, longitude }) => {
  await debouncer()
  return Geocoder.from({ latitude, longitude })
}
