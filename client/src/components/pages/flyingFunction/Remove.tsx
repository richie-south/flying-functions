import * as React from 'react'
import { deleteFlyingFunction } from '../../../lib/dal/flyingFunction'
import { compose, withHandlers, withState, defaultProps } from 'recompose'
import { ButtonWithInput } from '../../ButtonWithInput';
import { AlertType, AlertProps, getAlertTypeFromHttpStatus } from '../../Alert';

const enhance: any = compose(
  defaultProps({
    inputPlaceholder: 'Enter secretId',
    buttonName: 'Remove function',
  }),
  withState('inputValue', 'handleInputValue', ''),
  withState('alertProps', 'setAlert', {
    type: AlertType.Info,
    message: '',
    display: false,
  } as AlertProps),
  withHandlers({
    handleClick: ({ inputValue, setAlert }) => async () => {
      if (inputValue.trim() === '') {
        setAlert({
          type: AlertType.Warning,
          message: 'Enter flying function id',
          display: true,
        })
        return
      }
      try {
        const response = await deleteFlyingFunction(inputValue)
        const { id, message } = await response.json()
        if (!message || message.length <= 0) {
          return
        }
        setAlert({
          type: getAlertTypeFromHttpStatus(response.status),
          message: message,
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