import * as React from 'react'
import { store } from '../lib/store'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { compose, lifecycle, shouldUpdate, withHandlers, withState } from 'recompose'

const enhance: any = compose(
  connect(
    ({
      flyingFunctionResponse: {
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
  originalCode?: string,
  invocations?: string,
  createdAt?: string,
  updatedAt?: string,
}

export const _List = ({
  invocationUrl,
  secretId,
  name,
  urlId,
  code,
  originalCode,
  invocations,
  createdAt,
  updatedAt,
}: Props) =>
  <ListGroup>
    <ListGroupItem><b>InvicationURL:</b> <a href={invocationUrl}>{invocationUrl}</a></ListGroupItem>
    <ListGroupItem><b>SecretId:</b> {secretId}</ListGroupItem>
    <ListGroupItem><b>UrlId:</b> {urlId}</ListGroupItem>
    <ListGroupItem><b>Name:</b> {name}</ListGroupItem>
    {invocations && <ListGroupItem><b>Invocations:</b> {invocations}</ListGroupItem>}
    {createdAt && <ListGroupItem><b>CreatedAt:</b> {createdAt}</ListGroupItem>}
    {updatedAt && <ListGroupItem><b>UpdatedAt:</b> {updatedAt}</ListGroupItem>}
    {code && <ListGroupItem><b>Transformed code:</b> <pre>{code}</pre></ListGroupItem>}
    {originalCode && <ListGroupItem><b>Original code:</b> <pre>{originalCode}</pre></ListGroupItem>}
  </ListGroup>

export const List = enhance(_List)