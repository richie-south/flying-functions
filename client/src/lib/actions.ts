import { Action, createActions } from 'redux-decorated'

export const actions = createActions({
  storeFlyingFunction: {},
  removeFlyingFunction: {},
})

export const action = (action, payload) => ({
  type: action.type,
  payload,
})