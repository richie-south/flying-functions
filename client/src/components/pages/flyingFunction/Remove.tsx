import * as React from 'react'
import { deleteFlyingFunction } from '../../../lib/dal/flyingFunction'
import { compose, withHandlers, withState, defaultProps } from 'recompose'
import { ButtonWithInput } from '../../ButtonWithInput';
import { AlertType, AlertProps, getAlertTypeFromHttpStatus } from '../../Alert';
import { removeFlyingFunction } from '../../../lib/action-creators/flyingFunction'
import {connect} from 'react-redux'

const enhance: any = compose(
  connect(state => ({ dispatch: state.dispatch })),
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
    handleClick: ({ dispatch, inputValue, setAlert }) => async () => {
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
        const { secretId, message } = await response.json()
        if (!message || message.length <= 0) {
          return
        }
        setAlert({
          type: getAlertTypeFromHttpStatus(response.status),
          message: message,
          display: true,
        })
        removeFlyingFunction(dispatch, secretId)
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