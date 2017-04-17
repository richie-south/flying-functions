import * as React from 'react'
import { compose, withHandlers, withState, defaultProps } from 'recompose'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { createWebhook } from '../../../lib/dal/webhook'
import { _Button as Button } from '../../Button';
import { _Input as Input } from '../../Input'
import { Message, MessageType, MessageProps, getMessageTypeFromHttpStatus } from '../../Message';

const enhance: any = compose(
  defaultProps({
    inputUrlPlaceholder: 'Enter webhook url',
    inputIdPlaceholder: 'Enter flyingFunction urlId',
    buttonName: 'Create webhook',
  }),
  withState('urlInput', 'handleUrlInput', ''),
  withState('idInput', 'handleIdInput', ''),
  withState('secretId', 'setSecretId', ''),
  withState('message', 'setMessage', {
    messageType: MessageType.Info,
    message: '',
    displayMessage: false,
  } as MessageProps),

  withHandlers({
    handleSubmit: ({urlInput, idInput, setSecretId, setMessage}) => async () => {
      try {
        const response = await createWebhook(idInput, urlInput) as any
        const { id, message } = await response.json()
        setMessage({
          messageType: getMessageTypeFromHttpStatus(response.status),
          message: message,
          displayMessage: true,
        })
        setSecretId(id)
      } catch (error) {
        setMessage({
          messageType: MessageType.Danger,
          message: error.message,
          displayMessage: true,
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
  message: MessageProps,
}

export const _Create = ({
  handleUrlInput,
  handleIdInput,
  handleSubmit,
  inputUrlPlaceholder,
  inputIdPlaceholder,
  buttonName,
  secretId,
  message,
}: Props) =>
  <div>
    {message.displayMessage && 
      <Message 
        messageType={message.messageType} 
        message={message.message} 
      />
    }
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