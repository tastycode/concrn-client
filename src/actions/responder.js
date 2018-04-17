import * as R from "ramda"
import * as types from "actions/types"
import { NavigationActions } from "react-navigation"
import ConcrnClient from "services/ConcrnClient"
import { DeviceEventEmitter } from "react-native"

export function validate() {
  return async (dispatch, getState) => {
    const deviceId = getState().auth.deviceId
    const response = await ConcrnClient.responder.validate(
      {},
      {
        params: {
          device_id: deviceId,
        },
      },
    )
    if (R.pipe(R.path(["id"]), R.isNil())(response)) {
      // send user to responder info screen
      await dispatch(NavigationActions.navigate({ routeName: "About" }))
    } else {
      // store in auth
      await dispatch({
        type: types.ONBOARDING_STORE,
        responderId: response["id"],
      })
    }
  }
}

export function updateInitial({ lat, long, available }) {
  return async (dispatch, getState) => {
    const responderId = getState().auth.responderId
    const response = await ConcrnClient.responder.update({
      id: responderId,
      available,
      lat,
      long,
    })
    if (available) {
      const response = navigator.geolocation.requestAuthorization()
      console.log("response from requestAuthorization", response)
      const watchId = navigator.geolocation.watchPosition(
        position => {
          alert("got position", position)
          dispatch(
            updateLocation({
              lat: location.coords.latitude,
              long: location.coords.longitude,
            }),
          )
        },
        error => {
          alert(error)
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000,
          distanceFilter: 10,
        },
      )

      await dispatch({
        type: types.ONBOARDING_STORE,
        responder: {
          locationWatchId: watchId,
        },
      })
    } else {
      const watchId = getState().responder.locationWatchId
      navigator.geolocation.clearWatch(watchId)
    }
    await dispatch({
      type: types.ONBOARDING_STORE,
      responder: {
        available: response.available,
        lat: response.lat,
        long: response.long,
      },
    })
  }
}

export function updateLocation({ lat, long }) {
  return async (dispatch, getState) => {
    if (getState().auth.responder.available) {
      ConcrnClient.responder.update({
        available: true,
        lat,
        long,
      })
    }
  }
}
