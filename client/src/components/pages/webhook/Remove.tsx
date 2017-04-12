import * as React from 'react'
import { deleteWebhook } from '../../../lib/dal/webhook'
import {compose, withHandlers, withState, defaultProps} from 'recompose'
import { ButtonWithInput } from '../../ButtonWithInput';

const enhance: any = compose(
  defaultProps({
    inputPlaceholder: 'Enter secretId',
    buttonName: 'Remove webhook',
  }),
  withState('inputValue', 'handleInputValue', ''),
  withHandlers({
    handleClick: ({inputValue}) => async () => await deleteWebhook(inputValue),
  })
)

export const Remove = enhance(ButtonWithInput)