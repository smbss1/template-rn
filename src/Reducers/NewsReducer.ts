/* eslint-disable prettier/prettier */
import * as actions from '@/ActionTypes/NewsActionTypes'
import { News } from '@/Models'

export interface NewsState {
    news?: News[]
    isLoading?: boolean
    error?: any
}

const initialState: NewsState = {
    news: [],
    isLoading: false,
    error: null,
}

export default function authReducer(
    state: NewsState = initialState,
    action: actions.NewsActions,
): NewsState {
    switch (action.type) {
    case actions.GET_NEWS:
        return {
            isLoading: true,
            error: null,
            news: [],
        }
    case actions.GET_NEWS_SUCCESS:
        return {
            isLoading: false,
            error: null,
            news: action.news,
        }
    case actions.GET_NEWS_FAILURE:
        return {
            isLoading: false,
            error: action.error,
            news: [],
        }
    default:
        return state
    }
}
