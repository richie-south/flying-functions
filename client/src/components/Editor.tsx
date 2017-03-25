import * as React from 'react'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/monokai'
import {standard} from '../template/code'

import {connect} from 'react-redux'

import {store} from '../lib/store'
import {compose, lifecycle, shouldUpdate, withHandlers, withState} from 'recompose'
import { sendFlyingFunction, saveFlyingFunction } from '../lib/action-creators/flying-function';

const enhance: any = compose(
  withHandlers({
    handleChange: () => code => saveFlyingFunction(store.dispatch, code) 
  }),
)

type Props = {
  handleChange: Function,
}

const _Editor = ({
  handleChange,
}: Props) =>
   <AceEditor
    mode="javascript"
    theme="monokai"
    height={'300px'}
    width={'600px'}
    showGutter={false}
    onChange={value => handleChange(value)}
    name="_AceEditor"
    defaultValue={standard}
    tabSize={2}
    editorProps={{$blockScrolling: true} as any}
  />

export const Editor = enhance(_Editor)