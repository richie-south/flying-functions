import * as React from 'react'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/monokai'
import {standard} from '../template/code'

import {connect} from 'react-redux'

import {store} from '../lib/store'
import {compose, lifecycle, shouldUpdate, withHandlers, withState, defaultProps} from 'recompose'
import { sendFlyingFunction, saveFlyingFunction } from '../lib/action-creators/flying-function';

const enhance: any = compose(
  defaultProps({
    defaultValue: standard,
  }),
  withHandlers({
    handleChange: () => code => saveFlyingFunction(store.dispatch, code) 
  }),
)

type Props = {
  handleChange: Function,
  defaultValue: string,
  value: string,
}

const _Editor = ({
  handleChange,
  defaultValue,
  value,
}: Props) =>
   <AceEditor
    mode="javascript"
    theme="monokai"
    height={'400px'}
    width={'600px'}
    showGutter={false}
    onChange={value => handleChange(value)}
    name="_AceEditor"
    value={value}
    defaultValue={defaultValue}
    tabSize={2}
    editorProps={{$blockScrolling: true} as any}
  />

export const Editor = enhance(_Editor)