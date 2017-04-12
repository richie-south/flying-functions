import * as React from 'react'
import { viewFlyingFunction, updateFlyingFunction } from '../../../lib/dal/flyingFunction'
import { compose, withHandlers, withState, defaultProps } from 'recompose'
import { ButtonWithInput } from '../../ButtonWithInput';
import { _Button as Button } from '../../Button';
import { saveFlyingFunction } from '../../../lib/action-creators/flying-function';
import { Editor } from '../../Editor'
import { store } from '../../../lib/store'
import { TypeOfMessage, getMessageTypeFromHttpStatus } from '../../Message';

const enhance: any = compose(
  defaultProps({
    inputPlaceholder: 'Enter secretId',
    buttonName: 'Load flying function',
    buttonSaveName: 'Save',
  }),
  withState('inputValue', 'handleInputValue', ''),
  withState('editorValue', 'handleEditorValue', ''),
  withState('displayMessage', 'setDisplayMessage', false),
  withState('message', 'setMessage', ''),
  withState('messageType', 'setMessageType', TypeOfMessage),
  withHandlers({
    handleChange: () => code => saveFlyingFunction(store.dispatch, code),
    
    sendFlyingFunctionUpdate: ({ inputValue, setMessage, setMessageType, setDisplayMessage }) => async () => {
      const { flyingFunction }: any = store.getState()
      try {
        const response = await updateFlyingFunction(inputValue, flyingFunction)  
        const { message } = await response.json()
        setMessage(message)
        setMessageType(getMessageTypeFromHttpStatus(response.status))
        setDisplayMessage(true)
      } catch (error) {
        setMessage(error.message)
        setMessageType(TypeOfMessage.Danger)
        setDisplayMessage(true)
      }
      
    },

    getFlyingFunctionData: ({ inputValue, handleEditorValue, setMessage, setMessageType, setDisplayMessage }) => async () => {
      try {
        const response = await viewFlyingFunction(inputValue)
        const data = await response.json()
        if(!data.hasOwnProperty('code')){
          throw new Error('You need to enter valid flying function id')
        }
        handleEditorValue(v => data.code)
        setMessage(data.message)
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

type Props = {
  getFlyingFunctionData: Function,
  handleChange: Function,
  sendFlyingFunctionUpdate: Function,
  handleInputValue: Function,
  inputPlaceholder: string,
  buttonName: string,
  editorValue: string,
  buttonSaveName: string,
  messageType: TypeOfMessage,
  message: string,
  displayMessage: boolean,
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
  messageType,
  message,
  displayMessage,
}: Props) => 
  <div>
    <ButtonWithInput
      messageType={messageType}
      message={message}
      displayMessage={displayMessage}
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