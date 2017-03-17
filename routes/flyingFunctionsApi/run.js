'use strict'

const codeTransformer = require('../../lib/codeTransformer')
const codeStorageHandler = require('../../dal/codeStorageHandler')
const runCode = require('../../lib/runCode')

 const run = async (req, res) => {
  const { id } = req.params
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

    await codeStorageHandler.updateInvocations(id, currentInvocation)
    const invocationValue = await runCode(code, req.query, currentInvocation)

    res.json({
      result: invocationValue,
      invocations: currentInvocation,
      self: selfUrl,
    })  
  } catch (error) {
    res.status(500).json({message: error.message})
  } 
}

module.exports = run