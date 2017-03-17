'use strict'

const { getAll } = require('../../dal/codeStorageHandler')

const viewAll = async (req, res) => {
  try {
    const allCodes = await getAll()
    res.json(allCodes)  
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

module.exports = viewAll