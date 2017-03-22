'use strict'

const codeStorageHandler = require('../../dal/codeStorageHandler')

const create = async (req, res) => {
  const { id } = req.params
  
  try {
    
    await codeStorageHandler.remove(id)

    res.status(200).json({
      message: 'Flying function removed',
      id: _id,
    })
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

module.exports = create