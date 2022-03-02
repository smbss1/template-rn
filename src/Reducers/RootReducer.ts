import { combineReducers } from 'redux'
import authReducer from './AuthReducer'
import newsReducer from './NewsReducer'

const RootReducer = combineReducers({
    auth: authReducer,
    news: newsReducer,
})

export type AppState = ReturnType<typeof RootReducer>

export default RootReducer
