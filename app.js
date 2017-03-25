'use strict'

require('dotenv').config()
const env = process.env.NODE_ENV || 'development'
if (env === 'development') {
  const clear = require('clear') 
  clear() 
  clear()
}

const express = require('express')
const router = require('express').Router()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path')
const mongoose = require('mongoose')
const dbConnection = require('./config/db')

// adds standard promise libary to mongoose
mongoose.Promise = Promise

// open database connection
dbConnection()

const app = express()
const server = require('http').Server(app)

const port = process.env.PORT || 5001

app.set('json spaces', 2)

app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', router)

app.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.header("Access-Control-Allow-Headers", 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

// routes
app.use('/flying', require('./routes/flyingFunctionsApi/index.js'))
app.use('/webhook', require('./routes/invocationHookApi/index.js'))


// 404
app.use(function(req, res) {
  res
    .status(404)
    .send('404')
})

// 400
app.use(function(err, req, res, next) {
  if (err.status !== 400) {
    return next(err)
  }

  console.error(err.stack)
  res
    .status(400)
    .send('400')
})

// 500
app.use(function(err, req, res) {
  console.error(err.stack)
  res
    .status(500)
    .send('500')
})

server.listen(port, function() {
  console.log('Listening on port %d', server.address().port)
})
