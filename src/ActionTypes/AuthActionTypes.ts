import { User } from '@/Models'

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

export type AuthActions =
    | LoginAction
    | LoginSuccessAction
    | LoginFailureAction
    | RegisterAction
    | RegisterSuccessAction
    | RegisterFailureAction
