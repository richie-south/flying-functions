import * as React from 'react'
import { Link } from 'react-router-dom'
import { Nav, NavItem, Navbar, NavbarBrand } from 'reactstrap'
import { NavLink } from './CustomLink'

export const Header = ({ match }) =>
  <Navbar color="faded" light toggleable>
    <NavbarBrand href="https://github.com/richie-south/flying-functions">
    <span>Flying functions</span><img src="https://raw.githubusercontent.com/richie-south/flying-functions/master/ff.png" width="40" /></NavbarBrand>
    <Nav className="ml-auto" navbar>
      <NavItem>
        <NavLink
          children={'Flying function'}
          to={`${match.url}flying`}
        />
      </NavItem>
      <NavItem>
        <NavLink
          children={'Webhook'}
          to={`${match.url}webhook`}
        />
      </NavItem>
    </Nav>
  </Navbar>

