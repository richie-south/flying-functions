'use strict'

const urlCreator = require('../utils/runUrlCreator')

const view = (req, res) => {
  const { id } = req.params
  const { selfUrl, flyingFunctionData } = res.locals
  const { name } = flyingFunctionData

  const responseObject = Object.assign({}, flyingFunctionData, {
    invocationUrl: urlCreator(req.get('host'), name, id),
    self: selfUrl, 
  })

  res.status(200).json(responseObject)
}

module.exports = view