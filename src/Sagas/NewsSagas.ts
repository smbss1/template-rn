import { put, call, takeEvery, all, fork, takeLatest } from 'redux-saga/effects'
import { fetchNews } from '@/Services/NotificationsServices'
import * as actionCreators from '@/ActionCreators/NewsActionCreator'
import * as actionTypes from '@/ActionTypes/NewsActionTypes'

function* getNewsCall(action: actionTypes.GetNewsAction) {

    try {
        const {
            data,
        } = yield call(fetchNews)

        yield put(actionCreators.getNewsSuccess(data))
    } catch (error) {
        yield put(actionCreators.getNewsFailure(error))
    }
}

function* watchOnNews() {
    yield takeLatest(actionTypes.GET_NEWS, getNewsCall)
}

export default function* newsSagas() {
    yield all([fork(watchOnNews)])
}
