import * as React from 'react'
import { Link } from 'react-router-dom'
import { Nav as BNav, NavItem } from 'reactstrap';
import { NavLink } from '../../CustomLink';

export const Nav = ({ match }) =>
  <BNav>
    <NavItem>
      <NavLink
        children={'Create'}
        to={`${match.url}/create`}
      />
    </NavItem>
    <NavItem>
      <NavLink
        children={'View'}
        to={`${match.url}/view`}
      />
    </NavItem>
    <NavItem>
      <NavLink
        children={'Update'}
        to={`${match.url}/update`}
      />
    </NavItem>
    <NavItem>
      <NavLink
        children={'Delete'}
        to={`${match.url}/delete`}
      />
    </NavItem>
  </BNav>