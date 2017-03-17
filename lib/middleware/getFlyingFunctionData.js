'use strict'

const codeStorageHandler = require('../../dal/codeStorageHandler')

const getFlyingFunctionData = async (req, res, next) => {
  const { id } = req.params
  
  try {
    const { 
      _id, 
      name, 
      code, 
      invocations, 
      createdAt, 
      updatedAt 
    } = await codeStorageHandler.getById(id)

    res.locals.flyingFunctionData = {
      _id, 
      name, 
      code, 
      invocations, 
      createdAt, 
      updatedAt 
    }

    next()
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

module.exports = getFlyingFunctionData