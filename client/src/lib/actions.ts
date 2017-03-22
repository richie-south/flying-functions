import {Action, createActions} from 'redux-decorated'
import { flyingFunction } from './reducers/flying-function';

export const actions = createActions({
  HTTPMethod: {},
  sendFlyingFunction: {},
  saveFlyingFunction: {},
  flyingFunctionResponse: {},
  flyingFunctionName: {},
})

export const action = (action, payload) => ({
  type: action.type,
  payload,
})