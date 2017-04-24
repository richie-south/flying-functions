import * as React from 'react'
import { connect } from 'react-redux'
import { compose, defaultProps, withHandlers, withState } from 'recompose'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { _List as List} from './FlyingFunctionInfoList'
import {FlyingFunctionObj} from '../lib/action-creators/flyingFunction'
import {flyingFunctions} from '../lib/reducers/flyingFunction'
import {Collapse} from './Collapse'
import { Row, Col } from 'reactstrap'
import '../scss/header.scss'

const enhance: any = compose(
  connect(state => ({ 
    dispatch: state.dispatch,
    flyingFunctions: state.flyingFunctions,
  })),
  withHandlers({
  }),
)

type Props = {
  flyingFunctions: Array<FlyingFunctionObj>,
}

const _FlyingFunctionList = ({
  flyingFunctions,
}: Props) =>
  <ListGroup>
    {flyingFunctions.map((fF: FlyingFunctionObj, i: number) => 
        <ListGroupItem 
          key={i} 
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'baseline', 
          }}
        >
          <p>Name:&nbsp;{fF.name}</p>
          <Collapse>
            <ListGroup> 
              <ListGroupItem><strong>SecretId:&nbsp;</strong>{fF.secretId}</ListGroupItem>
              <ListGroupItem>Url:&nbsp;<a href={fF.invocationUrl}>{fF.invocationUrl}</a></ListGroupItem>
            </ListGroup>
          </Collapse>
        </ListGroupItem>  
      )}
  </ListGroup>

export const FlyingFunctionList = enhance(_FlyingFunctionList)