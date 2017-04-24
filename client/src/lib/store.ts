import { Store as ReduxStore, applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { flyingFunctions } from './reducers/flyingFunction'
import persistState from 'redux-localstorage'

const reducer = combineReducers({
  flyingFunctions,
})

export const store = createStore(
  reducer,
  compose(
    applyMiddleware(...[thunk]),
    persistState()
  )
)