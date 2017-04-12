'use strict'

const codeStorageHandler = require('../../dal/codeStorageHandler')
const mongooseErrors = require('../../lib/customErrors/mongooseErrors')

const remove = async (req, res) => {
  const { id } = req.params
  
  try {
    
    await codeStorageHandler.remove(id)

    res.status(200).json({
      message: 'Flying function removed',
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