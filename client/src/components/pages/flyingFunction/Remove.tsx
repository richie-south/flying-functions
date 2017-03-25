import * as React from 'react'
import { _Button as Button } from '../../Button'
import { _Input as Input } from '../../Input'
import { deleteFlyingFunction } from '../../../lib/dal/flyingFunction'
import {compose, withHandlers, withState} from 'recompose'
import { saveFlyingFunctionName } from '../../../lib/action-creators/flying-function-name'

const enhance: any = compose(
  withState('inputValue', 'handleInputValue', ''),
  withHandlers({
    handleInputValue: ({handleInputValue}) => (value) => handleInputValue(v => value),
    handleClick: ({inputValue, handleInputValue}) => () => deleteFlyingFunction(inputValue),
  })
)

type Props = {
  handleInputValue: Function,
  handleClick: Function,
}

export const _Remove = ({
  handleInputValue,
  handleClick,
}: Props) =>
  <div>
    <Input
      placeholder={'Enter secredId'}
      handleChange={value =>  handleInputValue(value)}
    />
    <Button
      name={'Remove function'}
      handleClick={() => handleClick()}
    />
  </div>
 
export const Remove = enhance(_Remove)