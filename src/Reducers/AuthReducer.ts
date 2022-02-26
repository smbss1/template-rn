/* eslint-disable prettier/prettier */
import * as actions from '@/ActionTypes/AuthActionTypes'
import { User } from '@/Models'
export interface AuthState {
    isLoading: boolean
    error?: any
    token?: string
    refreshToken?: string
}

const initialState: AuthState = {
    isLoading: false,
    error: null,
    token: undefined,
    refreshToken: undefined,
}

export default function authReducer(
    state: AuthState = initialState,
    action: actions.AuthActions,
): AuthState {
    switch (action.type) {
    case actions.LOGIN:
        return {
            isLoading: true,
            error: null,
        }
    case actions.LOGIN_SUCCESS:
        return {
            isLoading: false,
            error: null,
            token: action.token,
            refreshToken: action.refreshToken,
        }
    case actions.LOGIN_FAILURE:
        return {
            isLoading: false,
            error: action.error,
        }
    case actions.REGISTER:
        return {
            isLoading: true,
            error: null,
        }
    case actions.REGISTER_SUCCESS:
        return {
            isLoading: false,
            error: null,
        }
    case actions.REGISTER_FAILURE:
        return {
            isLoading: false,
            error: action.error,
        }
    case actions.REFRESH_TOKEN:
        return {
            isLoading: true,
            error: null,
        }
    case actions.REFRESH_TOKEN_SUCCESS:
        return {
            isLoading: false,
            error: null,
            token: action.token,
            refreshToken: action.refreshToken,
        }
    case actions.REFRESH_TOKEN_FAILURE:
        return {
            isLoading: false,
            error: action.error,
        }
    default:
        return state
    }
}
