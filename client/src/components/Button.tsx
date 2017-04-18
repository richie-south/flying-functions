import * as React from 'react'
import { store } from '../lib/store'
import { connect } from 'react-redux'
import { compose, lifecycle, shouldUpdate, withHandlers, withState } from 'recompose'
import { Button as BButton } from 'reactstrap'

type Props = {
  handleClick: Function,
  name: string
}

export const _Button = ({
  handleClick,
  name,
}: Props) =>
  <BButton outline color="primary"
    onClick={() => handleClick()}
  >
    {name}
  </BButton>
