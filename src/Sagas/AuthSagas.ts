import { put, call, takeEvery, all, fork, takeLatest } from 'redux-saga/effects'
import { fetchLogin, fetchRegister, fetchRefreshToken } from '@/Services/AuthServices'
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

function* refreshTokenCall({
    refreshToken
}: actionTypes.RefreshTokenAction) {
    
    const params = { }

    // Set the header with the refreshToken as Bearer like the API Doc said
    api.defaults.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
    }

    try {
        const { data } = yield call(fetchRefreshToken, params)

        // Reset the header with the new receive token
        api.defaults.headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${data.token}`,
        }

        yield put(actionCreators.refreshTokenSuccess(data.token, data.refreshToken))
    } catch (error) {
        yield put(actionCreators.refreshTokenFailure(error))
    }
}

function* watchOnAuth() {
    yield takeEvery(actionTypes.LOGIN, loginCall)
    yield takeEvery(actionTypes.REGISTER, registerCall)
    yield takeLatest(actionTypes.REFRESH_TOKEN, refreshTokenCall)
}

export default function* authSagas() {
    yield all([fork(watchOnAuth)])
}
