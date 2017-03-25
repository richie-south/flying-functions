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
  placeholder: string
}

export const _Input = ({
  handleChange,
  placeholder,
}: Props) =>
   <InputB
    placeholder={placeholder}
    onChange={({ target: { value } }) => handleChange(value)}
   >
  </InputB>

export const Input = enhance(_Input)