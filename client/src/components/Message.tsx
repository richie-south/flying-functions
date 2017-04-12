import * as React from 'react'
import {connect} from 'react-redux'
import { Alert } from 'reactstrap'
//import {compose, lifecycle, shouldUpdate, withHandlers, withState} from 'recompose'

export enum TypeOfMessage {
  Success,
  Info,
  Warning,
  Danger,
}

export const getMessageTypeFromHttpStatus = (status) => {
  switch (status) {
    case 200:
      return TypeOfMessage.Success
    case 500:
      return TypeOfMessage.Danger
    default:
      return TypeOfMessage.Info
  }
}

const color = [
  'success',
  'info',
  'warning',
  'danger',
]

type Props = {
  message: string,
  messageType: TypeOfMessage,
}

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