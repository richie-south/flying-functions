'use strict'

const codeStorageHandler = require('../../dal/codeStorageHandler')

const updateInvocations = async (req, res, next) => {
  
  const { 
    flyingFunctionData: {
      invocations,
      _id,
    },
  } = res.locals

  try {
    const currentInvocation = invocations + 1
    await codeStorageHandler.updateInvocations(_id, currentInvocation)

    res.locals.flyingFunctionData = Object.assign(
      {}, 
      res.locals.flyingFunctionData, 
      { currentInvocation }
    )

    next()

  } catch (error){
    console.log(error)
    return res.status(500).json({message: 'Error while updating invocations'})
  }
}

module.exports = updateInvocations