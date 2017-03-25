import { action, actions } from '../actions'
import { store } from '../store'
import { createFlyingFunction } from '../dal/flyingFunction'
import { onCreateFlyingFunctionResponse } from './flying-function-response'

export const sendFlyingFunction = async (dispatch: Function) => {
  const { flyingFunction, selectorHTTPType, flyingFunctionName } = store.getState() as any

  const response = await createFlyingFunction({ code: flyingFunction, name: flyingFunctionName} as any)
  const responseData = await response.json() as any
  
  onCreateFlyingFunctionResponse(dispatch, responseData)
}

export const saveFlyingFunction = (dispatch: Function, code: string): void => {
  dispatch(action(actions.saveFlyingFunction, code))
}
