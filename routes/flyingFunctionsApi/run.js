'use strict'

const codeTransformer = require('../../lib/codeTransformer')
const codeStorageHandler = require('../../dal/codeStorageHandler')
const invcocateFlyingWebhooks = require('../utils/invcocateFlyingWebhooks')
const invocationHookHandler = require('../../dal/invocationHookHandler')
const rp = require('request-promise')
const runCode = require('../../lib/runCode')

 const run = async (req, res) => {
  const codeParams = req.method === 'GET' ? req.params : req.body
  const { id } = codeParams
  const { 
    selfUrl,
    flyingFunctionData: {
      code, 
      type, 
      invocations, 
      name, 
      _id,
    },
  } = res.locals

  try {
    const currentInvocation = invocations + 1
    await codeStorageHandler.updateInvocations(_id, currentInvocation)
    const invocationValue = await runCode(code, codeParams, currentInvocation)

    const payload = {
      result: invocationValue,
      invocations: currentInvocation,
      self: selfUrl,
    }

    res.json(payload)

    const flyingFunctionHooks = await invocationHookHandler.findByFlyingFunctionId(_id)  
    invcocateFlyingWebhooks(flyingFunctionHooks, payload)
  } catch (error) {
    res.status(500).json({message: error.message})
  } 
}

module.exports = run