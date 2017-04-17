import * as React from 'react'
import { viewFlyingFunction, updateFlyingFunction } from '../../../lib/dal/flyingFunction'
import { compose, withHandlers, withState, defaultProps } from 'recompose'
import { ButtonWithInput } from '../../ButtonWithInput';
import { _Button as Button } from '../../Button';
import { saveFlyingFunction } from '../../../lib/action-creators/flying-function';
import { Editor } from '../../Editor'
import { store } from '../../../lib/store'
import { AlertType, AlertProps, getAlertTypeFromHttpStatus } from '../../Alert';
import { flyingFunction } from '../../../lib/reducers/flying-function';

const enhance: any = compose(
  defaultProps({
    inputPlaceholder: 'Enter secretId',
    buttonName: 'Load flying function',
    buttonSaveName: 'Save',
  }),
  withState('inputValue', 'handleInputValue', ''),
  withState('editorValue', 'handleEditorValue', ''),
  withState('alertProps', 'setAlert', {
    type: AlertType.Info,
    message: '',
    display: false,
  } as AlertProps),

  withHandlers({
    handleChange: () => code => saveFlyingFunction(store.dispatch, code),
    sendFlyingFunctionUpdate: ({ inputValue, setAlert, handleEditorValue }) => async () => {
      const { flyingFunction }: any = store.getState()
      handleEditorValue(flyingFunction)
      try {
        const response = await updateFlyingFunction(inputValue, flyingFunction)  
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

    getFlyingFunctionData: ({ inputValue, handleEditorValue, setAlert }) => async () => {
      try {
        const response = await viewFlyingFunction(inputValue)
        const data = await response.json()
        if(!data.hasOwnProperty('code')){
          throw new Error('You need to enter valid flying function id')
        }
        handleEditorValue(data.originalCode)

        setAlert({
          type: getAlertTypeFromHttpStatus(response.status),
          message: data.message,
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
  handleChange: Function,
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
  handleChange,
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
      handleInputValue={value =>  handleInputValue(value)}
      handleClick={() => getFlyingFunctionData()}
    />

    <Editor
      handleChange={handleChange}
      defaultValue={''}
      value={editorValue}
    />
    <Button
      handleClick={() => sendFlyingFunctionUpdate()}
      name={buttonSaveName}
    />
  </div>


export const Update = enhance(_Update)