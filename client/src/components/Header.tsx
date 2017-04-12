import * as React from 'react'
import { Jumbotron, Container, Row, Col } from 'reactstrap'

export const Header = () => 
  <Jumbotron fluid>
    <Container fluid>
      <h1 className="display-3">Flying function <img src="https://raw.githubusercontent.com/richie-south/flying-functions/master/ff.png" width="60"/></h1>
      <p className="lead"><a href="https://github.com/richie-south/flying-functions">Github repo</a></p>
    </Container>
  </Jumbotron>
