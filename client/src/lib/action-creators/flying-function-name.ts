import { action, actions } from '../actions'
import { store } from '../store'

export const saveFlyingFunctionName = (dispatch: Function, name: string): void => {
  dispatch(action(actions.flyingFunctionName, name))
}