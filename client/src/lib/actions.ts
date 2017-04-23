import { Action, createActions } from 'redux-decorated'

export const actions = createActions({
  flyingFunctions: [],
})

export const action = (action, payload) => ({
  type: action.type,
  payload,
})