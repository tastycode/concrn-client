import { takeEvery } from "redux-saga/effects"
export default function createWatchSaga(actionType, callback) {
  return function*() {
    yield takeEvery(actionType, callback)
  }
}
