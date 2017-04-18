import * as React from 'react'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/monokai'
import { standard } from '../template/code'
import { connect } from 'react-redux'
import { store } from '../lib/store'
import { compose, withHandlers, withState, defaultProps } from 'recompose'
import { _Button as Button } from './Button';

type Props = {
  handleChange: Function,
  defaultValue: string,
  value: string,
}

export const _Editor = ({
  handleChange,
  defaultValue,
  value,
}: Props) => (
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
      editorProps={{ $blockScrolling: true } as any}
    />
  )
