import { createStore, applyMiddleware } from 'redux'
import RootReducer from '../reducers/root_reducer'
import createLogger from 'redux-logger'

const loggerMiddleware = createLogger()

const configureStore = (preloadedState = {}) => (
	createStore(RootReducer, preloadedState, applyMiddleware(loggerMiddleware))
)

export default configureStore
