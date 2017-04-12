import * as React from 'react'
import { _Button as Button } from './Button'
import { _Input as Input } from './Input'
import { Message, TypeOfMessage } from './Message';

type Props = {
  handleInputValue: Function,
  handleClick: Function,
  inputPlaceholder: string,
  buttonName: string,
  messageType: TypeOfMessage,
  message: string,
  displayMessage: boolean,
}

export const ButtonWithInput = ({
  handleInputValue,
  handleClick,
  inputPlaceholder,
  buttonName,
  messageType,
  message,
  displayMessage,
}: Props) =>
  <div>
    {displayMessage && 
      <Message 
        messageType={messageType} 
        message={message} 
      />
    }
    <Input
      placeholder={inputPlaceholder}
      handleChange={value =>  handleInputValue(value)}
    />
    <Button
      name={buttonName}
      handleClick={() => handleClick()}
    />
  </div>
 
