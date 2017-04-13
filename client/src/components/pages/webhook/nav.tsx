import * as React from 'react'
import { Link, Route } from 'react-router-dom'
import { Nav as BNav, NavItem } from 'reactstrap'
import { NavLink } from '../../CustomLink';

export const Nav =({ match }) => 
  <BNav>
    <NavItem>
      <NavLink 
        children={'Create'}
        to={`${match.url}/create`}
      />
    </NavItem>
    <NavItem>
      <NavLink 
        children={'Delete'}
        to={`${match.url}/delete`}
      />
    </NavItem>
  </BNav>