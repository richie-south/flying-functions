import * as React from 'react'
import {Editor} from './components/Editor'
import {SaveButton} from './components/Save-button'
import { Input } from './components/Input'
import { Jumbotron, Container, Row, Col } from 'reactstrap'

export const App = () => 
  <div>

    <Jumbotron fluid>
      <Container fluid>
        <h1 className="display-3">Flying function</h1>
        <p className="lead">Enter name and flying function bellow</p>
      </Container>
    </Jumbotron>
    <Container> 
      <Input />
      <Editor/>
      <SaveButton/>
    </Container>
  </div>
  