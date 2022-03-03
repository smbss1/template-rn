
export const LOGOUT = 'AuthActionTypes/LOGOUT'
export interface LogoutAction {
    type: typeof LOGOUT
}

export const LOGIN = 'AuthActionTypes/LOGIN'
export interface LoginAction {
    type: typeof LOGIN
    email: string
    password: string
}

export const LOGIN_SUCCESS = 'AuthActionTypes/LOGIN_SUCCESS'
export interface LoginSuccessAction {
    type: typeof LOGIN_SUCCESS
    token: string
    refreshToken: string
}

export const LOGIN_FAILURE = 'AuthActionTypes/LOGIN_FAILURE'
export interface LoginFailureAction {
    type: typeof LOGIN_FAILURE
    error: Error | string
}

export const REGISTER = 'AuthActionTypes/REGISTER'
export interface RegisterAction {
    type: typeof REGISTER
    email: string
    password: string
}

export const REGISTER_SUCCESS = 'AuthActionTypes/REGISTER_SUCCESS'
export interface RegisterSuccessAction {
    type: typeof REGISTER_SUCCESS
}

export const REGISTER_FAILURE = 'AuthActionTypes/REGISTER_FAILURE'
export interface RegisterFailureAction {
    type: typeof REGISTER_FAILURE
    error: Error | string
}

export const REFRESH_TOKEN = 'AuthActionTypes/REFRESH_TOKEN'
export interface RefreshTokenAction {
    type: typeof REFRESH_TOKEN
    refreshToken: string
}

export const REFRESH_TOKEN_SUCCESS = 'AuthActionTypes/REFRESH_TOKEN_SUCCESS'
export interface RefreshTokenSuccessAction {
    type: typeof REFRESH_TOKEN_SUCCESS
    token: string
    refreshToken: string
}

export const REFRESH_TOKEN_FAILURE = 'AuthActionTypes/REFRESH_TOKEN_FAILURE'
export interface RefreshTokenFailureAction {
    type: typeof REFRESH_TOKEN_FAILURE
    error: Error | string
}

export const RESET_AUTH = 'AuthActionTypes/RESET_AUTH'
export interface ResetAuthAction {
    type: typeof RESET_AUTH
}

export type AuthActions =
    | LogoutAction
    | LoginAction
    | LoginSuccessAction
    | LoginFailureAction
    | RegisterAction
    | RegisterSuccessAction
    | RegisterFailureAction
    | RefreshTokenAction
    | RefreshTokenSuccessAction
    | RefreshTokenFailureAction
    | ResetAuthAction
