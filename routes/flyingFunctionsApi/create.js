'use strict'

const codeTransformer = require('../../lib/codeTransformer')
const urlCreator = require('../utils/runUrlCreator')
const codeStorageHandler = require('../../dal/codeStorageHandler')

const create = async (req, res) => {
  const { code, name } = req.body
  
  try {
    const transformedCode = codeTransformer(code)
    const { _id } = await codeStorageHandler.create(transformedCode, name)

    res.status(200).json({
      invocationUrl: urlCreator(req.get('host'), name, _id),
      name,
    })
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

module.exports = create