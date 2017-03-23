'use strict'

const _eval = require('eval')
const request = require('request-promise')
const invocationHookHandler = require('../dal/invocationHookHandler')
const codeStorageHandler = require('../dal/codeStorageHandler')
const flyingStorageHandler = require('../dal/flyingStorageHandler')

const globals = {
  console,
  Number,
  Math,
  Promise,
  setTimeout,
  
  // packages
  request,

  // own
  flyingStorageHandler,

  // dev only
  invocationHookHandler,
  codeStorageHandler,
}

const runCode = async (code, args, currentInvocation, flyingId) => {
  return await _eval(code, globals)(args, currentInvocation, flyingId)
}

module.exports = runCode
