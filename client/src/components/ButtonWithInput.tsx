import * as React from 'react'
import { _Button as Button } from './Button'
import { _Input as Input } from './Input'
import { Alert, AlertProps } from './Alert';

type Props = {
  handleInputValue: Function,
  handleClick: Function,
  inputPlaceholder: string,
  buttonName: string,
  alertProps: AlertProps,
}

export const ButtonWithInput = ({
  handleInputValue,
  handleClick,
  inputPlaceholder,
  buttonName,
  alertProps,
}: Props) =>
  <div>
    <Alert 
      type={alertProps.type} 
      message={alertProps.message} 
      display={alertProps.display}
    />
    <Input
      placeholder={inputPlaceholder}
      handleChange={value =>  handleInputValue(value)}
    />
    <Button
      name={buttonName}
      handleClick={() => handleClick()}
    />
  </div>
 
