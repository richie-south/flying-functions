import { Store as ReduxStore, applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { flyingFunction } from './reducers/flying-function'
import { selectorHTTPType } from './reducers/selector'
import { flyingFunctionResponse } from './reducers/flying-function-response'
import { flyingFunctionName } from './reducers/flying-function-name';

const reducer = combineReducers({
  flyingFunctionName,
  flyingFunction,
  flyingFunctionResponse,
  selectorHTTPType,
})

export const store = createStore(
  reducer,
  compose(
    applyMiddleware(...[thunk])
  )
)