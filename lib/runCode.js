'use strict'

const _eval = require('eval')
const request = require('request-promise')
const invocationHookHandler = require('../dal/invocationHookHandler')
const codeStorageHandler = require('../dal/codeStorageHandler')

const globals = {
  console,
  Number,
  Math,
  Promise,
  setTimeout,
  
  // packages
  request,

  // own
  invocationHookHandler,
  codeStorageHandler,

}

const runCode = async (code, args, currentInvocation) => {
  return await _eval(code, globals)(args, currentInvocation)
}

module.exports = runCode
