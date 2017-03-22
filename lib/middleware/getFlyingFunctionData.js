'use strict'

const codeStorageHandler = require('../../dal/codeStorageHandler')

const getFlyingFunctionData = (fn) => async (req, res, next) => {
  const { id } = req.params
  
  try {
    const { 
      _id, 
      urlId,
      name, 
      code, 
      invocations, 
      createdAt, 
      updatedAt 
    } = await fn(id)
    res.locals.flyingFunctionData = {
      _id, 
      urlId,
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



module.exports = getFlyingFunctionData(codeStorageHandler.getById)
module.exports.ByUrlId = getFlyingFunctionData(codeStorageHandler.getByUrlId)