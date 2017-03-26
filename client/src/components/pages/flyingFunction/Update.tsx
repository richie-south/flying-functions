import * as React from 'react'
import { viewFlyingFunction, updateFlyingFunction } from '../../../lib/dal/flyingFunction'
import { compose, withHandlers, withState, defaultProps } from 'recompose'
import { ButtonWithInput } from '../../ButtonWithInput';
import { _Button as Button } from '../../Button';
import { saveFlyingFunction } from '../../../lib/action-creators/flying-function';
import { Editor } from '../../Editor'
import { store } from '../../../lib/store'

const enhance: any = compose(
  defaultProps({
    inputPlaceholder: 'Enter secretId',
    buttonName: 'Load flying function',
    buttonSaveName: 'Save',
  }),
  withState('inputValue', 'handleInputValue', ''),
  withState('editorValue', 'handleEditorValue', ''),
  withHandlers({
    handleChange: () => code => saveFlyingFunction(store.dispatch, code),
    handleInputValue: ({handleInputValue}) => (value) => handleInputValue(v => value),
    
    sendFlyingFunctionUpdate: ({ inputValue }) => async () => {
      const { flyingFunction }: any = store.getState()
      try {
        await updateFlyingFunction(inputValue, flyingFunction)  
      } catch (error) {
        // handle errors
      }
      
    },

    getFlyingFunctionData: ({ inputValue, handleEditorValue }) => async () => {
      try {
        const response = await viewFlyingFunction(inputValue)
        const data = await response.json()
        if(!data.hasOwnProperty('code')){
          throw 'error'
        }
        handleEditorValue(v => data.code)
      } catch (error) {
        // TODO: handle error
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
}: Props) => 
  <div>
    <ButtonWithInput
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