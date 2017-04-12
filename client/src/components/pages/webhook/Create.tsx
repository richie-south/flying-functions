import * as React from 'react'
import { compose, withHandlers, withState, defaultProps } from 'recompose'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { createWebhook } from '../../../lib/dal/webhook'
import { _Button as Button } from '../../Button';
import { _Input as Input } from '../../Input'
import { Message, TypeOfMessage, getMessageTypeFromHttpStatus } from '../../Message';

const enhance: any = compose(
  defaultProps({
    inputUrlPlaceholder: 'Enter webhook url',
    inputIdPlaceholder: 'Enter flyingFunction id',
    buttonName: 'Create webhook',
  }),
  withState('urlInput', 'handleUrlInput', ''),
  withState('idInput', 'handleIdInput', ''),
  withState('secretId', 'setSecretId', ''),
  withState('doDisplayMessage', 'setDoDisplayMessage', false),
  withState('message', 'setMessage', ''),
  withState('messageType', 'setMessageType', TypeOfMessage),

  withHandlers({
    handleSubmit: ({urlInput, idInput, setSecretId, setDoDisplayMessage, setMessage, setMessageType, displayMessage}) => async () => {
      try {
        const response = await createWebhook(idInput, urlInput) as any
        const { id, message } = await response.json()

        setMessage(message)
        setMessageType(getMessageTypeFromHttpStatus(response.status))
        setDoDisplayMessage(true)
        setSecretId(id)
      } catch (error) {
        setMessage(error.message)
        setMessageType(TypeOfMessage.Danger)
        setDoDisplayMessage(true)
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
  doDisplayMessage: boolean,
  message: string
  messageType: TypeOfMessage,
}

export const _Create = ({
  handleUrlInput,
  handleIdInput,
  handleSubmit,
  inputUrlPlaceholder,
  inputIdPlaceholder,
  buttonName,
  secretId,
  doDisplayMessage,
  message,
  messageType,
}: Props) =>
  <div>
    {doDisplayMessage && <Message messageType={messageType} message={message} />}
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