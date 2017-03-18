'use strict'


const invocationHookHandler = require('../../dal/invocationHookHandler')

const create = async (req, res) => {
  const { id } = req.params
  const { url } = req.body
  
  try {
    const { _id } = await invocationHookHandler.create(url, id)
  
    res.status(200).json({
      message: 'hoock created!',
      id: _id,
    })
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

module.exports = create