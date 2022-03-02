import { all, fork } from 'redux-saga/effects'
import AuthSagas from './AuthSagas'
import NewsSagas from './NewsSagas'

export default function* rootSaga() {
    yield all([fork(NewsSagas)])
    yield all([fork(AuthSagas)])
}
