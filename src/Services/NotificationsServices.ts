import api from '@/Services'

interface newsResponse {
    data: Object
}

export async function fetchNews() : Promise<newsResponse> {
    const response = await api.get(`/news`)

    return response
}
