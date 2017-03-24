import * as React from 'react'
import { CreateFlyingFunction } from './CreateFlyingFunction'
import { Route } from 'react-router-dom'

export const FlyingFunctions = ({ match }) => 
  <div>
    <Route path={`${match.url}/create`} component={CreateFlyingFunction}/>

    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>