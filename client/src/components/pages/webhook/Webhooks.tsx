import * as React from 'react'
import { Create } from './Create'
import { Remove } from './Remove'
import { Nav } from './nav'
import { Route, Link } from 'react-router-dom'
import { Container } from '../../Container'

export const Webhooks = ({ match }) => 
  <Container>
    <Nav match={match}/>

    <Route path={`${match.url}/create`} component={Create}/>
    <Route path={`${match.url}/delete`} component={Remove}/>

    <Route exact path={match.url} render={() => (
      <div>Please select what you want to do.</div>
    )}/>
  </Container>