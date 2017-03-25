import * as React from 'react'
import { Create } from './Create'
import { Remove } from './Remove'

import { Route, Link } from 'react-router-dom'
import { Nav, NavItem, NavLink } from 'reactstrap'
import { Container } from '../../Container'

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

    <Route path={`${match.url}/create`} component={Create}/>
    <Route path={`${match.url}/view`} component={Create}/>
    <Route path={`${match.url}/update`} component={Create}/>
    <Route path={`${match.url}/delete`} component={Remove}/>

    <Route exact path={match.url} render={() => (
      <div>Please select what you want to do.</div>
    )}/>
  </Container>