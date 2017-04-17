import * as React from 'react'
import {connect} from 'react-redux'
import { Alert as BAlert } from 'reactstrap'
import { compose, withHandlers, withState } from 'recompose'

const cssClasses = [
  'success',
  'info',
  'warning',
  'danger',
]

const getAlertCssClass = (index) => 
  cssClasses[index]

export enum AlertType {
  Success,
  Info,
  Warning,
  Danger,
}

export type AlertProps = {
  type: AlertType,
  message: string,
  display: boolean,
}

export const getAlertTypeFromHttpStatus = (status) => {
  switch (status) {
    case 200:
      return AlertType.Success
    case 500:
      return AlertType.Danger
    case 400:
      return AlertType.Warning
    case 404:
      return AlertType.Info
    default:
      return AlertType.Info
  }
}

export const Alert = ({
  type,
  message,
  display,
}: AlertProps) =>
  <div>
  {display && 
    <BAlert color={getAlertCssClass(type)}>
      {message}
    </BAlert>}
  </div>
