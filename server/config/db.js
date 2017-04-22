'use strict'

const mongoose = require('mongoose')

/**
 * [makes an mongoose databese connection]
 * [dispalys errors if any]
 */
const initilize = () => {
  const db = mongoose.connection

  db.on('error', () => {
    console.log('db error')
  })

  db.once('open', () => {
    console.log('db open')
  })

  process.on('SIGINT', () => {
    db.close(() => {
      console.log(' Mongoose connection disconnected app termination.')
      process.exit(0)
    })
  })

  mongoose.connect('mongodb://localhost/flyingFunctionsTest')
}

module.exports = initilize