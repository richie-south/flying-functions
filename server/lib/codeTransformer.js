'use strict'

const babel = require('babel-core')

const codeTransformer = (code) => 
  babel.transform(code, {
    presets: ['es2015', 'babili'],
  }).code

module.exports = codeTransformer