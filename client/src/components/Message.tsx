import * as React from 'react'
import {connect} from 'react-redux'
import { Alert } from 'reactstrap'

export enum MessageType {
  Success,
  Info,
  Warning,
  Danger,
}

export const getMessageTypeFromHttpStatus = (status) => {
  switch (status) {
    case 200:
      return MessageType.Success
    case 500:
      return MessageType.Danger
    case 400:
      return MessageType.Warning
    default:
      return MessageType.Info
  }
}

export type MessageProps = {
  messageType: MessageType,
  message: string,
  displayMessage: boolean,
}

type Props = {
  message: string,
  messageType: MessageType,
}

const color = [
  'success',
  'info',
  'warning',
  'danger',
]

const getAlertColor = (type) => {
  return color[type]
}

export const Message = ({
  message,
  messageType,
}: Props) =>
   <div>
    <Alert color={getAlertColor(messageType)}>
       {message}
    </Alert>
  </div>