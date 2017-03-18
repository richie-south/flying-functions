'use strict'

const invocationHookHandler = require('../../dal/invocationHookHandler')

const getAllFlyingFunctionHooksWithId = async (req, res, next) => {
  const { id } = req.params
  try {
    const flyingFunctionHooks = await invocationHookHandler.findByFlyingFunctionId(id)  
    console.log(id)
    res.locals.flyingFunctionHooks = flyingFunctionHooks
    next()
  } catch (error) {
    res.res.status(500).json({message: 'Invalid url' })
  }
}

module.exports = getAllFlyingFunctionHooksWithId