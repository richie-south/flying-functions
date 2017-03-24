import * as React from 'react'
import { Editor } from '../Editor'
import { SaveButton } from '../Save-button'
import { Input } from '../Input'
import { List } from '../List'
import { Container } from '../Container'

export const CreateFlyingFunction = () => 
  <Container>
    <Input/>
    <Editor/>
    <SaveButton/>
    <List/>
  </Container>
 