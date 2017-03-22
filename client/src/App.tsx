import * as React from 'react'
import {Editor} from './components/Editor'
import {SaveButton} from './components/Save-button'
import { Input } from './components/Input'
import { List } from './components/List'
import { Jumbotron, Container, Row, Col } from 'reactstrap'

export const App = () => 
  <div>

    <Jumbotron fluid>
      <Container fluid>
        <h1 className="display-3">Flying function <img src="https://raw.githubusercontent.com/richie-south/flying-functions/master/ff.png" width="60"/></h1>
        <p className="lead">Enter name and flying function bellow <a href="https://github.com/richie-south/flying-functions">Github repo</a></p>
      </Container>
    </Jumbotron>
    
    <Container style={{ maxWidth: "630px"}}> 
      <Input />
      <Editor/>
      <SaveButton/>
      <List/>
      
    </Container>
  </div>
  