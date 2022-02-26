import * as actions from '@/ActionTypes/NewsActionTypes'
import { News } from '@/Models'

export function getNews() : actions.GetNewsAction {
    return {
        type: actions.GET_NEWS,
    }
}

export function getNewsSuccess(
    news: News[],
): actions.GetNewsSuccessAction {
    return {
        type: actions.GET_NEWS_SUCCESS,
        news,
    }
}

export function getNewsFailure(
    error: Error | string,
): actions.GetNewsFailureAction {
    return {
        type: actions.GET_NEWS_FAILURE,
        error,
    }
}
