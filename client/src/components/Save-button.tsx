import * as React from 'react'
import {store} from '../lib/store'
import {connect} from 'react-redux'
import {compose, lifecycle, shouldUpdate, withHandlers, withState} from 'recompose'
import {sendFlyingFunction} from '../lib/action-creators/flying-function'
import { Button } from 'reactstrap'


const enhance: any = compose(
  withHandlers({
    handleClick: ({dispatch}) => () => sendFlyingFunction(store.dispatch) 
  }),
)

type Props = {
  handleClick: Function,
}

const _SaveButton = ({
  handleClick,
}: Props) =>
   <Button outline color="primary"
    onClick={() => handleClick()}
   >
    Send function
  </Button>

export const SaveButton = enhance(_SaveButton)