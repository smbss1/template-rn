import api from '@/Services'

interface loginResponse {
    data: Object
}

export async function fetchLogin(params: Object): Promise<loginResponse> {
    const response = await api.post('auth/token', params)

    return response
}

interface registerResponse {
    data: Object
}

export async function fetchRegister(params: Object): Promise<registerResponse> {
    const response = await api.post('auth/register', params)

    return response
}

interface refreshTokenResponse {
    data: Object
}

export async function fetchRefreshToken(params: Object): Promise<refreshTokenResponse> {
    const response = await api.post('auth/token/refresh', params)

    return response
}
