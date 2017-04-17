import * as React from 'react'
import { _Button as Button } from './Button'
import { _Input as Input } from './Input'
import { Message, MessageProps, MessageType } from './Message';

type Props = {
  handleInputValue: Function,
  handleClick: Function,
  inputPlaceholder: string,
  buttonName: string,
  message: MessageProps,
}

export const ButtonWithInput = ({
  handleInputValue,
  handleClick,
  inputPlaceholder,
  buttonName,
  message,
}: Props) =>
  <div>
    {message.displayMessage && 
      <Message 
        messageType={message.messageType} 
        message={message.message} 
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
 
