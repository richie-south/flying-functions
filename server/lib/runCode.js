'use strict'

require('isomorphic-fetch')
const _eval = require('eval')
const invocationHookHandler = require('../dal/invocationHookHandler')
const codeStorageHandler = require('../dal/codeStorageHandler')
const storageHandler = require('../dal/flyingStorageHandler')
const R = require('ramda')
const plura = require('plura')
const flaxa = require('flaxa')
const laiva = require('laiva')
const timeeditApi = require('timeeditApi')
const destructo = require('destructo')

const globals = {
  console,
  Number,
  Math,
  Promise,
  setTimeout,
  
  // packages
  fetch,
  R,
  plura,
  flaxa,
  laiva,
  timeeditApi,
  destructo,

  // own
  storageHandler,
}

const runCode = async (code, _globals, args) => {
  const myGlobals = Object.assign({}, globals, _globals)
  return await _eval(code, myGlobals)(args)
}
  

module.exports = runCode
