'use strict'

const codeTransformer = require('../../lib/codeTransformer')
const urlCreator = require('../utils/runUrlCreator')
const codeStorageHandler = require('../../dal/codeStorageHandler')
const mongooseErrors = require('../../lib/customErrors/mongooseErrors')

const create = async (req, res) => {
  const { code, name } = req.body

  try {
    const transformedCode = codeTransformer(code)
    const { _id, urlId } = await codeStorageHandler.create(transformedCode, code, name)

    res.status(200).json({
      message: 'Flying function created!',
      invocationUrl: urlCreator(req.get('host'), name, urlId),
      secretId: _id,
      urlId,
      name,
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

module.exports = create