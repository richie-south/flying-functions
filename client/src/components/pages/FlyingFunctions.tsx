import * as React from 'react'
import { CreateFlyingFunction } from './CreateFlyingFunction'
import { RemoveFlyingFunction } from './RemoveFlyingFunction'

import { Route, Link } from 'react-router-dom'
import { Nav, NavItem, NavLink } from 'reactstrap'
import { Container } from '../Container'

export const FlyingFunctions = ({ match }) => 
  <Container>
    <Nav>
      <NavItem>
        <Link to={`${match.url}/create`}>
          Create
        </Link>
        <NavLink href="#">
        </NavLink>
      </NavItem>
      <NavItem>
        <Link to={`${match.url}/delete`}>
          Delete
        </Link>
        <NavLink href="#">Link</NavLink>
      </NavItem>
    </Nav>

    <Route path={`${match.url}/create`} component={CreateFlyingFunction}/>
    <Route path={`${match.url}/view`} component={CreateFlyingFunction}/>
    <Route path={`${match.url}/update`} component={CreateFlyingFunction}/>
    <Route path={`${match.url}/delete`} component={RemoveFlyingFunction}/>

    <Route exact path={match.url} render={() => (
      <div>Please select what you want to do.</div>
    )}/>
  </Container>