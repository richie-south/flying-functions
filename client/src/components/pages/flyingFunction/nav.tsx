import * as React from 'react'
import { Link } from 'react-router-dom'
import { Nav as BNav, NavItem, NavLink } from 'reactstrap'

export const Nav =({ match }) => 
  <BNav>
    <NavItem>
      <Link className={'nav-link'} to={`${match.url}/create`}>
        Create
      </Link>
    </NavItem>
    <NavItem>
      <Link className={'nav-link'} to={`${match.url}/view`}>
        View
      </Link>
    </NavItem>
    <NavItem>
      <Link className={'nav-link'} to={`${match.url}/update`}>
        Update
      </Link>
    </NavItem>
    <NavItem>
      <Link className={'nav-link'} to={`${match.url}/delete`}>
        Delete
      </Link>
    </NavItem>
  </BNav>