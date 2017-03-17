'use strict'

const _eval = require('eval')

const globals = {
  console,
  Number,
  Math,
  Promise,
  setTimeout,
}

const runCode = async (code, args) => {
  return await _eval(code, globals)(args)
}

module.exports = runCode