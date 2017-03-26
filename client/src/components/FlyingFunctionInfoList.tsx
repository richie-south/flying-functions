import * as React from 'react'
import {store} from '../lib/store'
import {connect} from 'react-redux'
import { ListGroup, ListGroupItem } from 'reactstrap'
import {compose, lifecycle, shouldUpdate, withHandlers, withState} from 'recompose'
import { saveFlyingFunctionName } from '../lib/action-creators/flying-function-name'

const enhance: any = compose(
  connect(
    ({
      flyingFunctionResponse:{
        invocationUrl,
        secretId,
        name,
        urlId,
      }
    }) => ({
      invocationUrl,
      secretId,
      name,
      urlId
    })
  )
)

export type Props = {
  invocationUrl: string,
  secretId: string,
  name: string,
  urlId: string,
  code?: string,
  invocations?: number,
  createdAt?: string,
  updatedAt?: string,
}

export const _List = ({
  invocationUrl,
  secretId,
  name,
  urlId,
  code,
  invocations,
  createdAt,
  updatedAt,
}: Props) =>
  <ListGroup>
    <ListGroupItem>InvicationURL: <a href={invocationUrl}>{invocationUrl}</a></ListGroupItem>
    <ListGroupItem>SecretId: {secretId}</ListGroupItem>
    <ListGroupItem>UrlId: {urlId}</ListGroupItem>
    <ListGroupItem>Name: {name}</ListGroupItem>
    {invocations !== 0 && <ListGroupItem>Invocations: {invocations === -1 ? 0 : invocations }</ListGroupItem>}
    {createdAt && <ListGroupItem>CreatedAt: {createdAt}</ListGroupItem>}
    {updatedAt && <ListGroupItem>UpdatedAt: {updatedAt}</ListGroupItem>}
    {code && <ListGroupItem>Code: <pre>{code}</pre></ListGroupItem>}
  </ListGroup>

export const List = enhance(_List)