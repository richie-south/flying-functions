import * as React from 'react'
import { Create } from './Create'
import { Remove } from './Remove'
import { View } from './View'
import { Update } from './Update'
import { Nav } from './nav'
import { Route, Link, Redirect, Switch } from 'react-router-dom'
import { Container } from '../../Container'
import { Row, Col } from 'reactstrap'
import {FlyingFunctionList} from '../../FlyingFunctionList'

export const FlyingFunctions = ({ match }) =>
  <Container>
    <Nav match={match} />
      <Row>
        <Col style={{ maxWidth: '630px' }}>
          <div style={{ maxWidth: '600px' }}>
          <Switch>
            <Route path={`${match.url}/create`} component={Create} />
            <Route path={`${match.url}/view`} component={View} />
            <Route path={`${match.url}/update`} component={Update} />
            <Route path={`${match.url}/delete`} component={Remove} />

            <Route render={() => (
              <Redirect to={`${match.url}/create`} />
            )} />
          </Switch>
          </div>
        </Col>

        <Col >
          <FlyingFunctionList />
        </Col>
      </Row>
  </Container>