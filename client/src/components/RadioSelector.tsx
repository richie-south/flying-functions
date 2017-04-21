import * as React from 'react'
import { Input, FormGroup, Label } from 'reactstrap';
import { compose, withHandlers, withState } from 'recompose'

type Props = {
  title: string,
  items: any,
  groupName: string
  itemClick: (itemType: string) => string,
}

export const RadioSelector = ({
  title,
  items,
  groupName,
  itemClick,
}: Props) => 
  <FormGroup 
  check>
    {items.map((item, i) =>
      <Label 
        key={i}
        check>
        <Input
          name={groupName}
          type="radio" 
          onClick={() => itemClick(item.text)}   
        />{item.text}
        </Label>)}
  </FormGroup>
