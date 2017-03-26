import * as React from 'react'
import { _Button as Button } from './Button'
import { _Input as Input } from './Input'

type Props = {
  handleInputValue: Function,
  handleClick: Function,
  inputPlaceholder: string,
  buttonName: string
}

export const ButtonWithInput = ({
  handleInputValue,
  handleClick,
  inputPlaceholder,
  buttonName,
}: Props) =>
  <div>
    <Input
      placeholder={inputPlaceholder}
      handleChange={value =>  handleInputValue(value)}
    />
    <Button
      name={buttonName}
      handleClick={() => handleClick()}
    />
  </div>
 
