import * as React from 'react'
import {store} from '../lib/store'
import {connect} from 'react-redux'
import { Input as InputB } from 'reactstrap'
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

export const _Input = ({
  handleChange,
}: Props) =>
   <InputB
    placeholder="Enter function name"
    onChange={({ target: { value } }) => handleChange(value)}
   >
    
  </InputB>

export const Input = enhance(_Input)