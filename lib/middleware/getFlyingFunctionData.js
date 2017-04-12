'use strict'

const codeStorageHandler = require('../../dal/codeStorageHandler')
const mongooseErrors = require('../customErrors/mongooseErrors')

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
      _id: _id,
      secretId: _id, 
      urlId,
      name, 
      code, 
      invocations, 
      createdAt, 
      updatedAt 
    }

    next()
  } catch (error) {
    if(mongooseErrors.isValidatorError(error)){
      console.log('isValidatorError')
      return res.status(400).json({
        message: error.errors.value.message,
      })
    }else if(mongooseErrors.isCastError(error)){
      console.log('isCastError')
      return res.status(400).json({
        message: error.message,
      })
    }

    res.status(500).json({message: error.message})
  }
}



module.exports = getFlyingFunctionData(codeStorageHandler.getById)
module.exports.ByUrlId = getFlyingFunctionData(codeStorageHandler.getByUrlId)