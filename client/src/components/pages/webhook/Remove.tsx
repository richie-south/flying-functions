import * as React from 'react'
import { deleteWebhook } from '../../../lib/dal/webhook'
import {compose, withHandlers, withState, defaultProps} from 'recompose'
import { ButtonWithInput } from '../../ButtonWithInput';
import { Alert, AlertType, AlertProps, getAlertTypeFromHttpStatus } from '../../Alert';


const enhance: any = compose(
  defaultProps({
    inputPlaceholder: 'Enter secretId',
    buttonName: 'Remove webhook',
  }),
  withState('inputValue', 'handleInputValue', ''),
  withState('alertProps', 'setAlert', {
    type: AlertType.Info,
    message: '',
    display: false,
  } as AlertProps),
  withHandlers({
    handleClick: ({inputValue, setAlert}) => async () => {
      try {
        const response = await deleteWebhook(inputValue)  
        const { id, message } = await response.json()
        setAlert({
          type: getAlertTypeFromHttpStatus(response.status),
          message,
          display: true,
        })
      } catch (error) {
        setAlert({
          type: AlertType.Danger,
          message: error.message,
          display: true,
        })
      }
      
    },
  })
)

export const Remove = enhance(ButtonWithInput)