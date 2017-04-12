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
    handleClick: ({inputValue}) => async () => await deleteFlyingFunction(inputValue),
  })
)

export const Remove = enhance(ButtonWithInput)