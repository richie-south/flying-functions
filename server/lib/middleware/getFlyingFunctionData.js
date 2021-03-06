'use strict'

const codeStorageHandler = require('../../dal/codeStorageHandler')
const mongooseErrors = require('../customErrors/mongooseErrors')

const getFlyingFunctionData = (fn) => async (req, res, next) => {
  const { id } = req.params
  
  try {

    const result = await fn(id)
    if(result === null){
      throw new Error('Flying function not found')
    }

    const { 
      _id, 
      urlId,
      name, 
      code,
      HTTPType, 
      originalCode,
      invocations, 
      createdAt, 
      updatedAt,
    } = result

    res.locals.flyingFunctionData = {
      _id,
      secretId: _id, 
      urlId,
      name, 
      code, 
      HTTPType,
      originalCode,
      invocations, 
      createdAt, 
      updatedAt, 
    }

    return next()
  } catch (error) {
    if(mongooseErrors.isValidatorError(error)){
      return res.status(400).json({
        message: error.errors.value.message,
      })
    }else if(mongooseErrors.isCastError(error)){
      return res.status(400).json({
        message: error.message,
      })
    }

    return res.status(500).json({message: error.message})
  }
}

module.exports = getFlyingFunctionData(codeStorageHandler.getById)
module.exports.ByUrlId = getFlyingFunctionData(codeStorageHandler.getByUrlId)