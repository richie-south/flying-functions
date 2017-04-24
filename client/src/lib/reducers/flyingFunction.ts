
import {createReducer} from 'redux-decorated'
import { actions} from '../actions'

export const flyingFunctions = createReducer([])
  .when(actions.storeFlyingFunction, (state, flyingFunction) => [...state, flyingFunction])
  .when(actions.removeFlyingFunction, (state, id) => 
    state.filter(fF => fF.secretId === id ? false : true)
  )
  .build()