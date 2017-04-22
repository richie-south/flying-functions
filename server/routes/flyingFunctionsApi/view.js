'use strict'

const urlCreator = require('../utils/runUrlCreator')

const view = (req, res) => {
  const { selfUrl, flyingFunctionData } = res.locals
  const { name, urlId } = flyingFunctionData

  const responseObject = Object.assign({}, flyingFunctionData, {
    message: 'Success',
    invocationUrl: urlCreator(req.get('host'), name, urlId),
    self: selfUrl, 
  })

  res.status(200).json(responseObject)
}

module.exports = view