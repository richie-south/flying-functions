'use strict'

const invocationHookHandler = require('../../dal/invocationHookHandler')
const mongooseErrors = require('../../lib/customErrors/mongooseErrors')

const remove = async (req, res, next) => {
  const { id } = req.params
  try {
    await invocationHookHandler.remove(id)  
    res.status(200).json({
      message: 'webhook removed!',
    })
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
    res.status(500).json({message: error.message})
  }
}

module.exports = remove