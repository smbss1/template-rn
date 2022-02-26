import { News } from '@/Models'

export const GET_NEWS = 'NewsActionTypes/GET_NEWS'
export interface GetNewsAction {
    type: typeof GET_NEWS
}

export const GET_NEWS_SUCCESS =
    'NewsActionTypes/GET_NEWS_SUCCESS'
export interface GetNewsSuccessAction {
    type: typeof GET_NEWS_SUCCESS
    news: News[]
}

export const GET_NEWS_FAILURE =
    'NewsActionTypes/GET_NEWS_FAILURE'
export interface GetNewsFailureAction {
    type: typeof GET_NEWS_FAILURE
    error: Error | string
}

export type NewsActions =
    | GetNewsAction
    | GetNewsSuccessAction
    | GetNewsFailureAction
