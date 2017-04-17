import * as React from 'react'
import { viewFlyingFunction, updateFlyingFunction } from '../../../lib/dal/flyingFunction'
import { compose, withHandlers, withState, defaultProps } from 'recompose'
import { ButtonWithInput } from '../../ButtonWithInput';
import { _Button as Button } from '../../Button';
import { saveFlyingFunction } from '../../../lib/action-creators/flying-function';
import { Editor } from '../../Editor'
import { store } from '../../../lib/store'
import { MessageType, MessageProps, getMessageTypeFromHttpStatus } from '../../Message';
import { flyingFunction } from '../../../lib/reducers/flying-function';



const enhance: any = compose(
  defaultProps({
    inputPlaceholder: 'Enter secretId',
    buttonName: 'Load flying function',
    buttonSaveName: 'Save',
  }),
  withState('inputValue', 'handleInputValue', ''),
  withState('editorValue', 'handleEditorValue', ''),
  withState('message', 'setMessage', {
    messageType: MessageType.Info,
    message: '',
    displayMessage: false,
  } as MessageProps),

  withHandlers({
    handleChange: () => code => saveFlyingFunction(store.dispatch, code),
    sendFlyingFunctionUpdate: ({ inputValue, setMessage, handleEditorValue }) => async () => {
      const { flyingFunction }: any = store.getState()
      handleEditorValue(flyingFunction)
      try {
        const response = await updateFlyingFunction(inputValue, flyingFunction)  
        const { message } = await response.json()
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

    getFlyingFunctionData: ({ inputValue, handleEditorValue, setMessage }) => async () => {
      try {
        const response = await viewFlyingFunction(inputValue)
        const data = await response.json()
        if(!data.hasOwnProperty('code')){
          throw new Error('You need to enter valid flying function id')
        }
        handleEditorValue(data.originalCode)

        setMessage({
          messageType: getMessageTypeFromHttpStatus(response.status),
          message: data.message,
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

type Props = {
  getFlyingFunctionData: Function,
  handleChange: Function,
  sendFlyingFunctionUpdate: Function,
  handleInputValue: Function,
  inputPlaceholder: string,
  buttonName: string,
  editorValue: string,
  buttonSaveName: string,
  message: MessageProps,
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
  message,
}: Props) => 
  <div>
    <ButtonWithInput
      message={message}
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