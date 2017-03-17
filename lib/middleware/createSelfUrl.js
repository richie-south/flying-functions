'use strict'

const createSelfUrl = (req, res, next) => {
  const url = req.originalUrl
  res.locals.selfUrl = `${req.get('host')}${url}`
  next()
}

module.exports = createSelfUrl