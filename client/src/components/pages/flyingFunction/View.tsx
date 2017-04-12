import * as React from 'react'

import { viewFlyingFunction } from '../../../lib/dal/flyingFunction'
import {compose, withHandlers, withState, defaultProps} from 'recompose'
import { ButtonWithInput } from '../../ButtonWithInput';
import { _List as List, Props as ListProps } from '../../FlyingFunctionInfoList';
import { TypeOfMessage, getMessageTypeFromHttpStatus } from '../../Message';


const enhance: any = compose(
  defaultProps({
    inputPlaceholder: 'Enter secretId',
    buttonName: 'Load flying function',
  }),
  withState('inputValue', 'handleInputValue', ''),
  withState('listValues', 'handleListValues', {
      code: ' ',
      invocations: -1,
      createdAt: ' ',
      updatedAt: ' ',
    }),
  withState('displayMessage', 'setDisplayMessage', false),
  withState('message', 'setMessage', ''),
  withState('messageType', 'setMessageType', TypeOfMessage),
  withHandlers({
    handleClick: ({inputValue, handleListValues, setMessage, setMessageType, setDisplayMessage}) => async () => {
      try {
        const response = await viewFlyingFunction(inputValue)
        const data = await response.json()
        
        if(!data.hasOwnProperty('code')){
          throw new Error('You need to enter valid flying function id')
        }
        
        handleListValues(v => data)
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
  handleInputValue: Function,
  handleClick: Function,
  inputPlaceholder: string,
  buttonName: string,
  listValues: ListProps,
  messageType: TypeOfMessage,
  message: string,
  displayMessage: boolean,
}

export const _View = ({
  handleInputValue,
  handleClick,
  inputPlaceholder,
  buttonName,
  listValues,
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
      handleClick={() => handleClick()}
    />
    <List {...listValues}/>
  </div>
 
export const View = enhance(_View)