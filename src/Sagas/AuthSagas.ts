import { put, call, takeEvery, all, fork } from 'redux-saga/effects'
import { fetchLogin, fetchRegister } from '@/Services/AuthServices'
import * as actionCreators from '@/ActionCreators/AuthActionCreator'
import * as actionTypes from '@/ActionTypes/AuthActionTypes'

import api from '@/Services'

function* loginCall({ email, password }: actionTypes.LoginAction) {
    const params = {
        email: email,
        password: password,
    }

    try {
        const { data } = yield call(fetchLogin, params)
        api.defaults.headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${data.token}`,
        }

        yield put(actionCreators.loginSuccess(data.token, data.refreshToken))
    } catch (error) {
        yield put(actionCreators.loginFailure(error))
    }
}

function* registerCall({
    email,
    password
}: actionTypes.RegisterAction) {
    const params = {
        email: email,
        password: password,
    }
    try {
        yield call(fetchRegister, params)

        yield put(actionCreators.registerSuccess())
    } catch (error) {
        yield put(actionCreators.registerFailure(error))
    }
}

function* watchOnAuth() {
    yield takeEvery(actionTypes.LOGIN, loginCall)
    yield takeEvery(actionTypes.REGISTER, registerCall)
}

export default function* authSagas() {
    yield all([fork(watchOnAuth)])
}
