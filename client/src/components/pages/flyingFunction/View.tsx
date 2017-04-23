import * as React from 'react'

import { viewFlyingFunction } from '../../../lib/dal/flyingFunction'
import { compose, withHandlers, withState, defaultProps } from 'recompose'
import { ButtonWithInput } from '../../ButtonWithInput';
import { _List as List, Props as ListProps } from '../../FlyingFunctionInfoList';
import { AlertType, AlertProps, getAlertTypeFromHttpStatus } from '../../Alert';

const enhance: any = compose(
  defaultProps({
    inputPlaceholder: 'Enter secretId',
    buttonName: 'Load flying function',
  }),
  withState('inputValue', 'handleInputValue', ''),
  withState('listValues', 'handleListValues', {
    code: ' ',
    originalCode: ' ',
    invocations: ' ',
    HTTPType: ' ',
    createdAt: ' ',
    updatedAt: ' ',
  }),
  withState('alertProps', 'setAlert', {
    type: AlertType.Info,
    message: '',
    display: false,
  } as AlertProps),
  withHandlers({
    handleClick: ({ inputValue, handleListValues, setAlert }) => async () => {
      try {
        const response = await viewFlyingFunction(inputValue)
        const data = await response.json()

        if (!data.hasOwnProperty('code')) {
          throw new Error('You need to enter valid flying function id')
        }

        // quick fix
        data.invocations = `${data.invocations}`
        handleListValues(v => data)

        setAlert({
          type: getAlertTypeFromHttpStatus(response.status),
          message: data.message,
          display: true,
        })

      } catch (error) {
        setAlert({
          type: AlertType.Danger,
          message: error.message,
          display: true,
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
  alertProps: AlertProps,
}

export const _View = ({
  handleInputValue,
  handleClick,
  inputPlaceholder,
  buttonName,
  listValues,
  alertProps,
}: Props) =>
  <div>
    <ButtonWithInput
      alertProps={alertProps}
      inputPlaceholder={inputPlaceholder}
      buttonName={buttonName}
      handleInputValue={value => handleInputValue(value)}
      handleClick={() => handleClick()}
    />
    <List {...listValues} />
  </div>

export const View = enhance(_View)