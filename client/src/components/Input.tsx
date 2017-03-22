import * as React from 'react'
import {store} from '../lib/store'
import {connect} from 'react-redux'
import {compose, lifecycle, shouldUpdate, withHandlers, withState} from 'recompose'
import { saveFlyingFunctionName } from '../lib/action-creators/flying-function-name'

const enhance: any = compose(
  withHandlers({
    handleChange: ({dispatch}) => (name) => saveFlyingFunctionName(store.dispatch, name) 
  }),
)

type Props = {
  handleChange: Function,
}

const _Input = ({
  handleChange,
}: Props) =>
   <input
    onChange={({ target: { value } }) => handleChange(value)}
   >
    
  </input>

export const Input = enhance(_Input)