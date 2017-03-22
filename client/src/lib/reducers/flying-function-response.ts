import {createReducer} from 'redux-decorated'
import {actions} from '../actions'

export const flyingFunctionResponse = createReducer({})
  .when(actions.flyingFunctionResponse, (state, response: Object) => response)
  .build()