import * as React from 'react'
import { FlyingFunctions } from './components/pages/FlyingFunctions'
import BrowserRouter from 'react-router-dom/BrowserRouter'
import Route from 'react-router/Route'
import { Header } from './components/Header'
import Switch from 'react-router/Switch'

export const App = () => 
  <BrowserRouter>
    <div>
      <Route component={Header}/>
      <Route path='/flying' component={FlyingFunctions} />
    </div>
  </BrowserRouter>
