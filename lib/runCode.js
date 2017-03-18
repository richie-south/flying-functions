'use strict'

const _eval = require('eval')

const globals = {
  console,
  Number,
  Math,
  Promise,
  setTimeout,
}

const runCode = async (code, args, currentInvocation) => {
  return await _eval(code, globals)(args, currentInvocation)
}

module.exports = runCode