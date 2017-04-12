import * as React from 'react'
import { FlyingFunctions } from './components/pages/flyingFunction/FlyingFunctions'
import { Webhooks } from './components/pages/webhook/Webhooks'
import {HashRouter} from 'react-router-dom'
import Route from 'react-router/Route'
import { Header } from './components/Header'
import Switch from 'react-router/Switch'

export const App = () => 
  <HashRouter>
    <div>
      <Route component={Header}/>
      <Route path='/flying' component={FlyingFunctions} />
      <Route path='/webhook' component={Webhooks} />
    </div>
  </HashRouter>
