'use strict'


const invocationHookHandler = require('../../dal/invocationHookHandler')
const mongooseErrors = require('../../lib/customErrors/mongooseErrors')

const create = async (req, res) => {
  const { id } = req.params
  const { url } = req.body
  try {
    const { _id, url: _url } = await invocationHookHandler.create(id, url)
    
    res.status(200).json({
      message: 'hook created!',
      id: _id,
      url: _url,
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