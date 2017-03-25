import * as React from 'react'
import { Editor } from '../../Editor'
import { Button } from '../../Button'
import { Input } from '../../Input'
import { List } from '../../CreatedFlyingFunctionInfoList'

export const Create = () => 
  <div>
    <Input
      placeholder={"Enter function name"}
    />
    <Editor/>
    <Button 
      name={'Create flying function'}
    />
    <List/>
  </div>
 