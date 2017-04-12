'use strict'


const invocationHookHandler = require('../../dal/invocationHookHandler')

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
    res.status(500).json({message: error.message})
  }
}

module.exports = create