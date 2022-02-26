import { combineReducers } from 'redux'
import lyricsReducer from './LyricsReducer'
import authReducer from './AuthReducer'
import newsReducer from './NewsReducer'

const RootReducer = combineReducers({
    lyrics: lyricsReducer,
    auth: authReducer,
    news: newsReducer,
})

export type AppState = ReturnType<typeof RootReducer>

export default RootReducer
