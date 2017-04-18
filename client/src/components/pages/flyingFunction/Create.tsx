import * as React from 'react'
import { _Editor as Editor } from '../../Editor'
import { _Button as Button } from '../../Button'
import { _Input as Input } from '../../Input'
import { _List as List, Props as ListProps } from '../../FlyingFunctionInfoList';
import { compose, defaultProps, withHandlers, withState } from 'recompose';
import { standard } from '../../../template/code';
import { createFlyingFunction } from '../../../lib/dal/flyingFunction';
import { Alert, AlertType, AlertProps, getAlertTypeFromHttpStatus } from '../../Alert';

const enhance: any = compose(
  defaultProps({
    defaultValue: standard,
    buttonName: 'Create flying function',
    inputPlaceholder: 'Enter function name',
  }),
  withState('editorValue', 'handleEditorChange', standard),
  withState('inputValue', 'handleInputValue', ''),
  withState('listValues', 'handleListValues', {
    code: '',
    originalCode: '',
  }),
  withState('alertProps', 'setAlert', {
    type: AlertType.Info,
    message: '',
    display: false,
  } as AlertProps),
  withHandlers({
    handleButtonClick: ({ editorValue, inputValue, handleListValues, setAlert }) => async () => {
      if (inputValue.trim() === '') {
        setAlert({
          type: AlertType.Warning,
          message: 'Enter flying function name',
          display: true,
        })
        return
      }
      try {
        const response = await createFlyingFunction({ code: editorValue, name: inputValue } as any)
        const responseData = await response.json() as any
        handleListValues(responseData)

        setAlert({
          type: getAlertTypeFromHttpStatus(response.status),
          message: responseData.message,
          display: true,
        })
      } catch (error) {
        setAlert({
          type: AlertType.Danger,
          message: error.message,
          display: true,
        })
      }
    }
  }),
)

type Props = {
  handleEditorChange: Function,
  handleButtonClick: Function,
  handleInputValue: Function,
  defaultValue: string,
  buttonName: string
  inputPlaceholder: string,
  editorValue: string,
  listValues: ListProps,
  alertProps: AlertProps,
}

const _Create = ({
  handleEditorChange,
  handleButtonClick,
  handleInputValue,
  defaultValue,
  buttonName,
  inputPlaceholder,
  editorValue,
  listValues,
  alertProps,
}: Props) =>
  <div>
    <Alert
      type={alertProps.type}
      message={alertProps.message}
      display={alertProps.display}
    />
    <Input
      handleChange={handleInputValue}
      placeholder={inputPlaceholder}
    />
    <Editor
      handleChange={handleEditorChange}
      defaultValue={defaultValue}
      value={editorValue}
    />
    <Button
      name={buttonName}
      handleClick={handleButtonClick}
    />
    <List {...listValues} />
  </div>

export const Create = enhance(_Create)