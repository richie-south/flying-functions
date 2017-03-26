'use strict'

const codeStorageHandler = require('../../dal/codeStorageHandler')

const update = async (req, res) => {
  const { id } = req.params
  const { code } = req.body
  
  try {
    
    await codeStorageHandler.update(id, code)

    res.status(200).json({
      message: 'Flying function updated',
    })
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

module.exports = update