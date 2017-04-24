import * as React from 'react'
import { viewFlyingFunction, updateFlyingFunction } from '../../../lib/dal/flyingFunction'
import { compose, withHandlers, withState, defaultProps } from 'recompose'
import { ButtonWithInput } from '../../ButtonWithInput'
import { _Button as Button } from '../../Button'
import { _Editor as Editor } from '../../Editor'
import { store } from '../../../lib/store'
import { AlertType, AlertProps, getAlertTypeFromHttpStatus } from '../../Alert'

const enhance: any = compose(
  defaultProps({
    inputPlaceholder: 'Enter secretId',
    buttonName: 'Load flying function',
    buttonSaveName: 'Save',
  }),
  withState('inputValue', 'handleInputValue', ''),
  withState('editorValue', 'handleEditorChange', ''),
  withState('flyingId', 'setFlyingId', ''),
  withState('alertProps', 'setAlert', {
    type: AlertType.Info,
    message: '',
    display: false,
  } as AlertProps),

  withHandlers({
    sendFlyingFunctionUpdate: ({ editorValue, flyingId, setAlert }) => async () => {
      try {
        const response = await updateFlyingFunction(flyingId, editorValue)
        const { message } = await response.json()
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

    getFlyingFunctionData: ({ inputValue, editorValue, setAlert, handleEditorChange, setFlyingId }) => async () => {
      try {
        const response = await viewFlyingFunction(inputValue)
        const data = await response.json()
        const { originalCode, message, secretId } = data
        if (!data.hasOwnProperty('code')) {
          throw new Error('Enter a valid flying function id')
        }
        handleEditorChange(originalCode)
        setFlyingId(secretId)
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

type Props = {
  getFlyingFunctionData: Function,
  handleEditorChange: Function,
  sendFlyingFunctionUpdate: Function,
  handleInputValue: Function,
  inputPlaceholder: string,
  buttonName: string,
  editorValue: string,
  buttonSaveName: string,
  alertProps: AlertProps,
}

export const _Update = ({
  getFlyingFunctionData,
  sendFlyingFunctionUpdate,
  handleInputValue,
  handleEditorChange,
  inputPlaceholder,
  buttonName,
  editorValue,
  buttonSaveName,
  alertProps,
}: Props) =>
  <div>
    <ButtonWithInput
      alertProps={alertProps}
      inputPlaceholder={inputPlaceholder}
      buttonName={buttonName}
      handleInputValue={value => handleInputValue(value)}
      handleClick={() => getFlyingFunctionData()}
    />
    <Editor
      handleChange={handleEditorChange}
      defaultValue={''}
      value={editorValue}
    />
    <Button
      handleClick={() => sendFlyingFunctionUpdate()}
      name={buttonSaveName}
    />
  </div>

export const Update = enhance(_Update)