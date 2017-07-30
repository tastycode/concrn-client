import ConcrnClient from 'services/ConcrnClient'
import { NavigationActions } from 'react-navigation'
import * as types from 'actions/types'

export function validate({ phone, deviceId, name}) {
  return async (dispatch, getState) => {
    let response
    dispatch({
      type: types.ONBOARDING_STORE,
      phone, deviceId, name
    })
    try {
      response = await ConcrnClient.device.validate({phone, device_id: deviceId})
      await dispatch({
        type: types.ONBOARDING_STORE,
        reporterId: response.reporter_id
      })
      await dispatch({
        type: types.ONBOARDING_COMPLETE
      })
    }
    catch (e) {
      response = await ConcrnClient.device.create({phone, device_id: deviceId})
      await dispatch(NavigationActions.navigate({routeName: 'Verify'}))
    }
  }
}

export function verify({code}) {
  return async (dispatch, getState) => {
    let { auth } = getState()
    try {
      let response = await ConcrnClient.device.verify({code, phone: auth.phone, device_id: auth.deviceId, name: auth.name})
      await dispatch({
        type: types.ONBOARDING_STORE,
        reporterId: response.reporter_id
      })
      await dispatch({
        type: types.ONBOARDING_COMPLETE
      })
    }
    catch (e) {
      await dispatch({
        type: types.ONBOARDING_FAIL,
        error: 'The code you entered was incorrect'
      })
    }
  }
}


