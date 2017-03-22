import {createReducer} from 'redux-decorated'
import {actions} from '../actions'

export const selectorHTTPType = createReducer('')
  .when(actions.HTTPMethod, (state, method: string) => method)
  .build()