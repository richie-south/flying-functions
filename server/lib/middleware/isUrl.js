'use strict'

const checkUrl = require('is-url')

const isUrl = (req, res, next) => {
  const { url } = req.body

  checkUrl(url) ? 
    next() :
    res.status(500).json({message: 'Invalid url' })
}

module.exports = isUrl