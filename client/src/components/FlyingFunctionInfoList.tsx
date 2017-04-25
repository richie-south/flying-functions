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
  HTTPType?: string,
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
  HTTPType,
  createdAt,
  updatedAt,
}: Props) =>
  <ListGroup>
    <ListGroupItem><strong>InvicationURL:</strong>&nbsp;<a href={invocationUrl}>{invocationUrl}</a></ListGroupItem>
    <ListGroupItem><strong>SecretId:</strong>&nbsp;{secretId}</ListGroupItem>
    <ListGroupItem><strong>UrlId:</strong>&nbsp;{urlId}</ListGroupItem>
    <ListGroupItem><strong>Name:</strong>&nbsp;{name}</ListGroupItem>
    {invocations && <ListGroupItem><strong>Invocations:</strong>&nbsp;{invocations}</ListGroupItem>}
    {HTTPType && <ListGroupItem><strong>HTTP Type:</strong>&nbsp;{HTTPType}</ListGroupItem>}
    {createdAt && <ListGroupItem><strong>CreatedAt:</strong>&nbsp;{createdAt}</ListGroupItem>}
    {updatedAt && <ListGroupItem><strong>UpdatedAt:</strong>&nbsp;{updatedAt}</ListGroupItem>}
    {code && <ListGroupItem><strong>Transformed code:</strong>&nbsp;<pre>{code}</pre></ListGroupItem>}
    {originalCode && <ListGroupItem><strong>Original code:</strong>&nbsp;<pre>{originalCode}</pre></ListGroupItem>}
  </ListGroup>

export const List = enhance(_List)