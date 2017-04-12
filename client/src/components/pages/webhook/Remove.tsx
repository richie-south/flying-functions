import * as React from 'react'
import { deleteWebhook } from '../../../lib/dal/webhook'
import {compose, withHandlers, withState, defaultProps} from 'recompose'
import { ButtonWithInput } from '../../ButtonWithInput';
import { TypeOfMessage, getMessageTypeFromHttpStatus } from '../../Message';


const enhance: any = compose(
  defaultProps({
    inputPlaceholder: 'Enter secretId',
    buttonName: 'Remove webhook',
  }),
  withState('inputValue', 'handleInputValue', ''),
  withState('displayMessage', 'setDisplayMessage', false),
  withState('message', 'setMessage', ''),
  withState('messageType', 'setMessageType', TypeOfMessage),
  withHandlers({
    handleClick: ({inputValue, setMessage, setMessageType, setDisplayMessage}) => async () => {
      try {
        const response = await deleteWebhook(inputValue)  
        const { id, message } = await response.json()

        setMessage(message)
        setMessageType(getMessageTypeFromHttpStatus(response.status))
        setDisplayMessage(true)
      } catch (error) {
        setMessage(error.message)
        setMessageType(TypeOfMessage.Danger)
        setDisplayMessage(true)
      }
      
    },
  })
)

export const Remove = enhance(ButtonWithInput)