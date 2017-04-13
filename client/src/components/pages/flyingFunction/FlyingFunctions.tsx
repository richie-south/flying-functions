import * as React from 'react'
import { Create } from './Create'
import { Remove } from './Remove'
import { View } from './View'
import { Update } from './Update'
import { Nav } from './nav'
import { Route, Link, Redirect, Switch } from 'react-router-dom'
import { Container } from '../../Container'

export const FlyingFunctions = ({ match }) => 
  <Container>
    <Nav match={match}/>

    <Switch>
      <Route path={`${match.url}/create`} component={Create}/>
      <Route path={`${match.url}/view`} component={View}/>
      <Route path={`${match.url}/update`} component={Update}/>
      <Route path={`${match.url}/delete`} component={Remove}/>

      <Route render={() => (
        <Redirect to={`${match.url}/create`}/>
      )}/>
    </Switch>
    

    
  </Container>