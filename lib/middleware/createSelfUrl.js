'use strict'

const createSelfUrl = (req, res, next) => {
  const url = req.originalUrl
  //res.locals.selfUrl = `${req.get('host')}${url}`

  res.locals.selfUrl = process.env.DEV ? 
  `${req.get('host')}${url}` :
  `https://${req.get('host')}/projectflying/${url}`

  next()
}

module.exports = createSelfUrl