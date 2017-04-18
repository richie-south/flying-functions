import * as React from 'react'
import { compose, withHandlers, withState, defaultProps } from 'recompose'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { createWebhook } from '../../../lib/dal/webhook'
import { _Button as Button } from '../../Button';
import { _Input as Input } from '../../Input'
import { Alert, AlertType, AlertProps, getAlertTypeFromHttpStatus } from '../../Alert';

const enhance: any = compose(
  defaultProps({
    inputUrlPlaceholder: 'Enter webhook url',
    inputIdPlaceholder: 'Enter flyingFunction urlId',
    buttonName: 'Create webhook',
  }),
  withState('urlInput', 'handleUrlInput', ''),
  withState('idInput', 'handleIdInput', ''),
  withState('secretId', 'setSecretId', ''),
  withState('alertProps', 'setAlert', {
    type: AlertType.Info,
    message: '',
    display: false,
  } as AlertProps),

  withHandlers({
    handleSubmit: ({ urlInput, idInput, setSecretId, setAlert }) => async () => {
      try {
        const response = await createWebhook(idInput, urlInput) as any
        const { id, message } = await response.json()
        setAlert({
          type: getAlertTypeFromHttpStatus(response.status),
          message,
          display: true,
        })
        setSecretId(id)
      } catch (error) {
        setAlert({
          type: AlertType.Danger,
          message: error.message,
          display: true,
        })
      }
    }
  })
)

type Props = {
  handleUrlInput: Function,
  handleIdInput: Function,
  handleSubmit: Function,
  inputUrlPlaceholder: string,
  inputIdPlaceholder: string,
  buttonName: string,
  secretId: string,
  alertProps: AlertProps,
}

export const _Create = ({
  handleUrlInput,
  handleIdInput,
  handleSubmit,
  inputUrlPlaceholder,
  inputIdPlaceholder,
  buttonName,
  secretId,
  alertProps,
}: Props) =>
  <div>
    <Alert
      type={alertProps.type}
      message={alertProps.message}
      display={alertProps.display}
    />
    <Input
      placeholder={inputUrlPlaceholder}
      handleChange={value => handleUrlInput(value)}
    />
    <Input
      placeholder={inputIdPlaceholder}
      handleChange={value => handleIdInput(value)}
    />
    <Button
      name={buttonName}
      handleClick={() => handleSubmit()}
    />
    <ListGroup>
      {secretId && <ListGroupItem>SecretId: {secretId}</ListGroupItem>}
    </ListGroup>
  </div>

export const Create = enhance(_Create)