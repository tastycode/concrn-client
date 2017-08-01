import * as types from 'actions/types'
import { NavigationActions } from 'react-navigation'
import ConcrnClient from 'services/ConcrnClient'

export function createReport({latitude, longitude}) {
  return async (dispatch, getState) => {
    const reporterId = getState().auth.reporterId
    const reportData = {
      lat: latitude,
      long: longitude,
      reporter_id: reporterId
    }
    const response= await ConcrnClient.report.create({report: reportData})
    dispatch({
      type: types.REPORT_STORE,
      reportId: response.id
    })
    dispatch(NavigationActions.navigate({routeName: 'chat'}))
  }
}

export function reportSendMessage({reportId, text}) {
  return async function(dispatch, getState) {
    const reporterId = getState().auth.reporterId
    const response = await ConcrnClient.report.messages.create({
      reportId,
      message: {
        report_id: reportId,
        reporter_id: reporterId,
        text
      }
    })
  }
}

export function reportMessages(id) {
  return async function(id) {
    const response = await ConcrnClient.report.messages({id: id})
    dispatch({
      type: types.REPORT_MESSAGE_RECEIVED,
    })
  }
}

export function reportMessageReceived(data) {
  return {
    type: types.REPORT_MESSAGE_RECEIVED,
    message: data
  }
}
