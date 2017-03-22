'use strict'

const invocationHookHandler = require('../../dal/invocationHookHandler')

const remove = async (req, res, next) => {
  const { id } = req.params
  try {
    await invocationHookHandler.remove(id)  
    res.status(200).json({
      message: 'webhook removed!',
      id: _id,
    })
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

module.exports = remove