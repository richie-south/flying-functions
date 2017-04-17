import * as React from 'react'

import { viewFlyingFunction } from '../../../lib/dal/flyingFunction'
import {compose, withHandlers, withState, defaultProps} from 'recompose'
import { ButtonWithInput } from '../../ButtonWithInput';
import { _List as List, Props as ListProps } from '../../FlyingFunctionInfoList';
import { MessageType, MessageProps, getMessageTypeFromHttpStatus } from '../../Message';


const enhance: any = compose(
  defaultProps({
    inputPlaceholder: 'Enter secretId',
    buttonName: 'Load flying function',
  }),
  withState('inputValue', 'handleInputValue', ''),
  withState('listValues', 'handleListValues', {
      code: ' ',
      originalCode: ' ',
      invocations: -1,
      createdAt: ' ',
      updatedAt: ' ',
    }),
  withState('message', 'setMessage', {
    messageType: MessageType.Info,
    message: '',
    displayMessage: false,
  } as MessageProps),
  withHandlers({
    handleClick: ({inputValue, handleListValues, setMessage}) => async () => {
      try {
        const response = await viewFlyingFunction(inputValue)
        const data = await response.json()
        
        if(!data.hasOwnProperty('code')){
          throw new Error('You need to enter valid flying function id')
        }
        handleListValues(v => data)
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
  handleInputValue: Function,
  handleClick: Function,
  inputPlaceholder: string,
  buttonName: string,
  listValues: ListProps,
  message: MessageProps,
}

export const _View = ({
  handleInputValue,
  handleClick,
  inputPlaceholder,
  buttonName,
  listValues,
  message,
}: Props) =>
  <div>
    <ButtonWithInput
      message={message}
      inputPlaceholder={inputPlaceholder}
      buttonName={buttonName}
      handleInputValue={value =>  handleInputValue(value)}
      handleClick={() => handleClick()}
    />
    <List {...listValues}/>
  </div>
 
export const View = enhance(_View)