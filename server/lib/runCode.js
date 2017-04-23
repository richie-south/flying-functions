'use strict'

require('isomorphic-fetch')
const _eval = require('eval')
const invocationHookHandler = require('../dal/invocationHookHandler')
const codeStorageHandler = require('../dal/codeStorageHandler')
const storageHandler = require('../dal/flyingStorageHandler')

const globals = {
  console,
  Number,
  Math,
  Promise,
  setTimeout,
  
  // packages
  fetch,

  // own
  storageHandler,
}

const runCode = async (code, args, currentInvocation, flyingId) => 
  await _eval(code, globals)(args, currentInvocation, flyingId)

module.exports = runCode
