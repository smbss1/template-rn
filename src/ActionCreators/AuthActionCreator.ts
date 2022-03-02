import * as actions from '@/ActionTypes/AuthActionTypes'

export function login(
    email: string,
    password: string
): actions.LoginAction {
    return {
        type: actions.LOGIN,
        email,
        password
    }
}

export function logout() : actions.LogoutAction {
    return {
        type: actions.LOGOUT,
    }
}

export function loginSuccess(
    token: string,
    refreshToken: string,
): actions.LoginSuccessAction {
    return {
        type: actions.LOGIN_SUCCESS,
        token,
        refreshToken,
    }
}

export function loginFailure(
    error: Error | string,
): actions.LoginFailureAction {
    return {
        type: actions.LOGIN_FAILURE,
        error,
    }
}

export function register(
    email: string,
    password: string,
): actions.RegisterAction {
    return {
        type: actions.REGISTER,
        email,
        password,
    }
}

export function registerSuccess() : actions.RegisterSuccessAction {
    return {
        type: actions.REGISTER_SUCCESS,
    }
}

export function registerFailure(
    error: Error | string,
): actions.RegisterFailureAction {
    return {
        type: actions.REGISTER_FAILURE,
        error,
    }
}

export function refreshTokenAction(
    refreshToken: string,
): actions.RefreshTokenAction {
    return {
        type: actions.REFRESH_TOKEN,
        refreshToken,
    }
}

export function refreshTokenSuccess(token: string, refreshToken: string) : actions.RefreshTokenSuccessAction {
    return {
        type: actions.REFRESH_TOKEN_SUCCESS,
        token,
        refreshToken
    }
}

export function refreshTokenFailure(
    error: Error | string,
): actions.RefreshTokenFailureAction {
    return {
        type: actions.REFRESH_TOKEN_FAILURE,
        error,
    }
}

export function resetAuthError(): actions.ResetAuthErrorAction {
    return {
        type: actions.RESET_AUTH_ERROR,
    }
}