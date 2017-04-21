import 'babel-polyfill'
import * as React from 'react'
import { render } from 'react-dom'
import { App } from './App'
import { Provider } from 'react-redux'
import {store} from './lib/store'
import 'bootstrap/dist/css/bootstrap.css'
import './scss/header.scss'

function renderApp(App) {
  const app = document.getElementById('app')
  render(
    <Provider store={store}>
      <App />
    </Provider>, 
    app
  )
}

/*
if (window.document) {
  window['React'] = React
  renderApp(App)
}

if (module['hot']) {
  module['hot'].accept('./app', () => {
    const UpdatedApp = require('./app').app
    setTimeout(() => renderApp(UpdatedApp))
  })
}
*/

renderApp(App)