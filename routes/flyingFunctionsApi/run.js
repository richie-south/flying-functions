'use strict'

const codeTransformer = require('../../lib/codeTransformer')
const codeStorageHandler = require('../../dal/codeStorageHandler')
const rp = require('request-promise')
const runCode = require('../../lib/runCode')

 const run = async (req, res) => {
  const codeParams = req.method === 'GET' ? req.params : req.body
  const { id } = codeParams
  
  const { 
    selfUrl, 
    flyingFunctionHooks,
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

    await codeStorageHandler.updateInvocations(id, currentInvocation)
    const invocationValue = await runCode(code, codeParams, currentInvocation)

    const payload = {
      result: invocationValue,
      invocations: currentInvocation,
      self: selfUrl,
      webhooks: flyingFunctionHooks,
    }

    // run all webhooks
    // move to mircoservice
    await Promise.all(flyingFunctionHooks.map((hook) => 
      rp({
        uri: hook.url,
        method: 'POST',
        body: payload,
        json: true,
      })))

    res.json(payload)
  } catch (error) {
    res.status(500).json({message: error.message})
  } 
}

module.exports = run