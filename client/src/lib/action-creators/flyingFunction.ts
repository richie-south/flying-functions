import {action, actions} from '../actions'

export const storeFlyingFunction = (dispatch, flyingFunction: {}) =>
  dispatch(action(actions.flyingFunctions, flyingFunction))
