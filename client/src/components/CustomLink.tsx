import * as React from 'react'
import { Link, Route } from 'react-router-dom'

export const onMatchRoute = ({to, activeOnlyWhenExact}, fn) => (
  <Route 
    path={to} 
    exact={activeOnlyWhenExact} 
    children={fn}/>
)

export const CustomLink = ({ activeStyle, activeClass, children, className, to, activeOnlyWhenExact }) => 
  onMatchRoute({to, activeOnlyWhenExact}, ({match}) => 
    <Link 
        to={to} 
        className={(match && `${activeClass} ${className}`) || className} 
        style={match && activeStyle}>
          {children}
      </Link>
  )

export const CustomLinkSwitch = ({activeStyle, activeClass, children, className, to, activeOnlyWhenExact, SwitchElement}) => 
  onMatchRoute({to, activeOnlyWhenExact}, ({match}) => 
    match &&
      <SwitchElement
        className={(match && `${activeClass} ${className}`) || className} 
        style={match && activeStyle}>
          {children}
      </SwitchElement> ||
      <Link 
        to={to} 
        className={(match && `${activeClass} ${className}`) || className} 
        style={match && activeStyle}>
          {children}
      </Link>
  )

export const NavLink = ({children, to}) => 
  <CustomLinkSwitch
    activeClass={'disabled'}
    activeStyle={{}}
    to={to}
    className={'nav-link'}
    activeOnlyWhenExact={true}
    children={children}
    SwitchElement={'div'}
  />