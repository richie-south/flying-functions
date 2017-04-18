import { Store as ReduxStore, applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'

const reducer = combineReducers({})

export const store = createStore(
  reducer,
  compose(
    applyMiddleware(...[thunk])
  )
)