import * as React from 'react'
import { deleteFlyingFunction } from '../../../lib/dal/flyingFunction'
import {compose, withHandlers, withState, defaultProps} from 'recompose'
import { ButtonWithInput } from '../../ButtonWithInput';

const enhance: any = compose(
  defaultProps({
    inputPlaceholder: 'Enter secretId',
    buttonName: 'Remove function',
  }),
  withState('inputValue', 'handleInputValue', ''),
  withHandlers({
    handleInputValue: ({handleInputValue}) => (value) => handleInputValue(v => value),
    handleClick: ({inputValue}) => () => deleteFlyingFunction(inputValue),
  })
)

export const Remove = enhance(ButtonWithInput)