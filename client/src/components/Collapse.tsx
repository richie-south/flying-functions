import * as React from 'react'
import { connect } from 'react-redux'
import { compose, defaultProps, withHandlers, withState } from 'recompose'
import { Collapse as BCollapse, Button, CardBlock, Card } from 'reactstrap'

const enhance: any = compose(
  connect(state => ({ 
    dispatch: state.dispatch,
  })),
  withState('isOpen', 'setIsOpen', false),
  withHandlers({
    toggle: ({isOpen, setIsOpen}) => () => setIsOpen(!isOpen)
  }),
)

type Props = {
  children: any,
  toggle: (e: MouseEvent) => void,
  isOpen: boolean,
}

const _Collapse = ({
  children,
  toggle,
  isOpen,
}: Props) =>
   <div>
    <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>show</Button>
    <BCollapse isOpen={isOpen}>
      {children}
    </BCollapse>
  </div>

export const Collapse = enhance(_Collapse)