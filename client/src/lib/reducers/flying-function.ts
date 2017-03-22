import {createReducer} from 'redux-decorated'
import {actions} from '../actions'
import { standard } from '../../template/code';

export const flyingFunction = createReducer(standard)
  .when(actions.sendFlyingFunction, (state, code: string) => code)
  .when(actions.saveFlyingFunction, (state, code: string) => code)
  .build()