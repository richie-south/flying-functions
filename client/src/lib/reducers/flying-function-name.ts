import {createReducer} from 'redux-decorated'
import {actions} from '../actions'

export const flyingFunctionName = createReducer('')
  .when(actions.flyingFunctionName, (state, name: string) => name)
  .build()