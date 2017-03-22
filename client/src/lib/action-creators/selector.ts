import {action, actions} from '../actions'

export const selectHTTPMethod = (dispatch: Function, method) => {
  method === 'GET' || method === 'POST' ? 
    dispatch(action(actions.HTTPMethod, method)) : 
    null
}