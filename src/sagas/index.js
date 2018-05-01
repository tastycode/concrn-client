import { all, fork } from "redux-saga/effects"

import authSaga from "./auth"
import reportSaga from "./report"

const rootSaga = function*() {
  yield all([fork(authSaga), fork(reportSaga)])
}

export default rootSaga
