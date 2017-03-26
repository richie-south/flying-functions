import * as React from 'react'

import { viewFlyingFunction } from '../../../lib/dal/flyingFunction'
import {compose, withHandlers, withState, defaultProps} from 'recompose'
import { ButtonWithInput } from '../../ButtonWithInput';
import { _List as List, Props as ListProps } from '../../FlyingFunctionInfoList';

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
  withHandlers({
    handleInputValue: ({handleInputValue}) => (value) => handleInputValue(v => value),
    handleClick: ({inputValue, handleListValues}) => async () => {
      try {
        const response = await viewFlyingFunction(inputValue)
        const data = await response.json()
        if(!data.hasOwnProperty('code')){
          throw 'error'
        }
        
        handleListValues(v => data)
      } catch (error) {
        // TODO: handle error
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
}

export const _View = ({
  handleInputValue,
  handleClick,
  inputPlaceholder,
  buttonName,
  listValues,
}: Props) =>
  <div>
    <ButtonWithInput
      inputPlaceholder={inputPlaceholder}
      buttonName={buttonName}
      handleInputValue={value =>  handleInputValue(value)}
      handleClick={() => handleClick()}
    />
    <List {...listValues}/>
  </div>
 
export const View = enhance(_View)