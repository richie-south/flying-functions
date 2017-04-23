
import {createReducer} from 'redux-decorated'
import { actions} from '../actions'

export const flyingFunctions = createReducer([])
  .when(actions.flyingFunctions, (state, flyingFunction) => [...state, flyingFunction])
  .build()