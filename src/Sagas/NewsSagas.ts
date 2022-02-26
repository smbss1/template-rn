import { put, call, takeEvery, all, fork } from 'redux-saga/effects'
import { fetchNews } from '@/Services/NotificationsServices'
import * as actionCreators from '@/ActionCreators/NotificationsActionCreator'
import * as actionTypes from '@/ActionTypes/NewsActionTypes'

function* getNewsCall(action: actionTypes.GetNewsAction) {
    try {
        const {
            data,
        } = yield call(fetchNews)

        console.log(data)
        yield put(actionCreators.getNewsSuccess(data))
    } catch (error) {
        console.log(error)

        yield put(actionCreators.getNewsFailure(error))
    }
}

function* watchOnNews() {
    yield takeEvery(actionTypes.GET_NEWS, getNewsCall)
}

export default function* newsSagas() {
    yield all([fork(watchOnNews)])
}
