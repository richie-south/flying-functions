'use strict'

const codeTransformer = require('../../lib/codeTransformer')
const codeStorageHandler = require('../../dal/codeStorageHandler')
const invcocateFlyingWebhooks = require('../utils/invcocateFlyingWebhooks')
const invocationHookHandler = require('../../dal/invocationHookHandler')
const rp = require('request-promise')
const runCode = require('../../lib/runCode')

 const run = async (req, res) => {
  const codeParams = req.method === 'GET' ? req.query : req.body
  const _requestOrigin = req.get('origin')
  const { id } = req.params
  const { 
    selfUrl,
    flyingFunctionData: {
      code,
      name,
      HTTPType,
      secretId,
      invocations,
      currentInvocation,
      _id,
      urlId,
    },
  } = res.locals

  try {
    const invocationValue = await runCode(
        code, 
        {
          _requestOrigin,
          _flyingFunctionData: {
            name,
            HTTPType,
            urlId,
            secretId,
            invocations: currentInvocation,
          },
        },
        codeParams
      )

    const payload = {
      result: invocationValue ? invocationValue : null,
      invocations: currentInvocation,
      self: selfUrl,
    }

    res.json(payload)
    
    const flyingFunctionHooks = await invocationHookHandler.findByFlyingFunctionId(urlId)  
    invcocateFlyingWebhooks(flyingFunctionHooks, payload)
  } catch (error) {
    res.status(500).json({message: error.message})
  } 
}

module.exports = run