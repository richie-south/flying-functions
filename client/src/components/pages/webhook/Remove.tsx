import * as React from 'react'
import { deleteWebhook } from '../../../lib/dal/webhook'
import {compose, withHandlers, withState, defaultProps} from 'recompose'
import { ButtonWithInput } from '../../ButtonWithInput';
import { MessageType, MessageProps, getMessageTypeFromHttpStatus } from '../../Message';


const enhance: any = compose(
  defaultProps({
    inputPlaceholder: 'Enter secretId',
    buttonName: 'Remove webhook',
  }),
  withState('inputValue', 'handleInputValue', ''),
  withState('message', 'setMessage', {
    messageType: MessageType.Info,
    message: '',
    displayMessage: false,
  } as MessageProps),
  withHandlers({
    handleClick: ({inputValue, setMessage}) => async () => {
      try {
        const response = await deleteWebhook(inputValue)  
        const { id, message } = await response.json()
        setMessage({
          messageType: getMessageTypeFromHttpStatus(response.status),
          message: message,
          displayMessage: true,
        })
      } catch (error) {
        setMessage({
          messageType: MessageType.Danger,
          message: error.message,
          displayMessage: true,
        })
      }
      
    },
  })
)

export const Remove = enhance(ButtonWithInput)