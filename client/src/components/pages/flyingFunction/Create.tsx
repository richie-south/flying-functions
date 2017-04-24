import * as React from 'react'
import { connect } from 'react-redux'
import { _Editor as Editor } from '../../Editor'
import { _Button as Button } from '../../Button'
import { _Input as Input } from '../../Input'
import { _List as List, Props as ListProps } from '../../FlyingFunctionInfoList';
import { compose, defaultProps, withHandlers, withState } from 'recompose'
import { standard } from '../../../template/code'
import { createFlyingFunction } from '../../../lib/dal/flyingFunction'
import { Alert, AlertType, AlertProps, getAlertTypeFromHttpStatus } from '../../Alert'
import { RadioSelector } from '../../RadioSelector'
import { storeFlyingFunction } from '../../../lib/action-creators/flyingFunction'

const HTTPType = (type: string) => (fn: Function) => fn(type)

const enhance: any = compose(
  connect(state => ({ dispatch: state.dispatch })),
  defaultProps({
    defaultValue: standard,
    buttonName: 'Create flying function',
    inputPlaceholder: 'Enter function name',
    radioItems: [
      {text: 'GET'},
      {text: 'POST'}
    ],
  }),
  withState('editorValue', 'handleEditorChange', standard),
  withState('inputValue', 'handleInputValue', ''),
  withState('httpType', 'setHTTPType', ''),
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
    handleButtonClick: ({ dispatch, httpType, editorValue, inputValue, handleListValues, setAlert }) => async () => {
      if (inputValue.trim() === '') {
        setAlert({
          type: AlertType.Warning,
          message: 'Enter flying function name',
          display: true,
        })
        return
      }

      if(httpType.trim() === ''){
        setAlert({
          type: AlertType.Warning,
          message: 'Select an http type',
          display: true,
        })
        return
      }

      try {
        const flyingFunction = { code: editorValue, name: inputValue, HTTPType: httpType } as any
        const response = await createFlyingFunction(flyingFunction)
        const responseData = await response.json() as any
        const { secretId, urlId, invocationUrl, HTTPType } = responseData
        handleListValues(responseData)

        setAlert({
          type: getAlertTypeFromHttpStatus(response.status),
          message: responseData.message,
          display: true,
        })

        storeFlyingFunction(dispatch, responseData)
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
  setHTTPType: (httpType: string) => string,
  radioItems: any,
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
  setHTTPType,
  radioItems,
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
    <RadioSelector
      groupName={'HTTPTypeSelector'}
      title={'HTTP type'}
      itemClick={setHTTPType}
      items={radioItems}
    />
    <Button
      name={buttonName}
      handleClick={handleButtonClick}
    />
    <List {...listValues} />
  </div>

export const Create = enhance(_Create)