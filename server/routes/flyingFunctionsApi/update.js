'use strict'

const codeTransformer = require('../../lib/codeTransformer')
const codeStorageHandler = require('../../dal/codeStorageHandler')
const mongooseErrors = require('../../lib/customErrors/mongooseErrors')

const update = async (req, res) => {
  const { id } = req.params
  const { code } = req.body
  
  try {
    const transformedCode = codeTransformer(code)
    await codeStorageHandler.update(id, transformedCode, code)

    res.status(200).json({
      message: 'Flying function updated',
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

module.exports = update