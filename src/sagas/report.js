import { all, call, fork, put } from "redux-saga/effects"
import { Alert } from "react-native"
import { NavigationActions } from "react-navigation"

import ConcrnClient from "services/ConcrnClient"
import createWatchSaga from "lib/createWatchSaga"
import * as types from "actions/types"

function* reportCreate(action) {
  const { reporterNotes, address, lat, long, isHarmImmediate } = action.payload
  const response = yield call(ConcrnClient.report.create, action.payload)
  yield call(
    Alert.alert,
    `Your report has been submitted. You will receive a text shortly that may ask for more information`,
  )
  yield put(NavigationActions.navigate({ routeName: "reportList" }))
}

function* reportSagas() {
  yield all([fork(createWatchSaga(types.REPORT_CREATE, reportCreate))])
}

export default reportSagas
