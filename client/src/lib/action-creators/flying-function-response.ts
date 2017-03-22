import { action, actions } from '../actions'
import { store } from '../store'

export const onCreateFlyingFunctionResponse = (dispatch: Function, response: Object): void => {
  dispatch(action(actions.flyingFunctionResponse, response))
}