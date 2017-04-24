import {action, actions} from '../actions'

export type FlyingFunctionObj = {
  code: string,
  originalCode: string
  name: string,
  HTTPType: string,
  secretId: string,
  urlId: string,
  invocationUrl: string,
  message: string,
}

export const storeFlyingFunction = (dispatch, flyingFunction: FlyingFunctionObj): void =>
  dispatch(action(actions.storeFlyingFunction, flyingFunction))

export const removeFlyingFunction = (dispatch, id: string): void => 
  dispatch(action(actions.removeFlyingFunction, id))