import * as React from 'react'
import { Editor } from '../Editor'
import { Button } from '../Button'
import { Input } from '../Input'
import { List } from '../CreatedFlyingFunctionInfoList'

export const CreateFlyingFunction = () => 
  <div>
    <Input/>
    <Editor/>
    <Button name={'Create flying function'}/>
    <List/>
  </div>
 