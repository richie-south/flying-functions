import * as React from 'react'
import { Create } from './Create'
import { Remove } from './Remove'
import { Nav } from './nav'
import { Route, Link, Redirect, Switch } from 'react-router-dom'
import { Container } from '../../Container'

export const Webhooks = ({ match, activeOnlyWhenExact }) =>
  <Container>
    <Nav match={match} />

    <Switch>
      <Route path={`${match.url}/create`} component={Create} />
      <Route path={`${match.url}/delete`} component={Remove} />

      <Route render={(props) => (
        <Redirect to={`${match.url}/create`} />
      )} />
    </Switch>
  </Container>