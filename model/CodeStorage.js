'use strict'

const mongoose = require('mongoose')

const CodeStorageSchema = mongoose.Schema({
  
  name: {
    type: String,
    required: [true, 'Name is required'],
  },

  code: {
    type: String, 
    required: [true, 'Code is required'],
  },

  invocations: {
    type: Number,
    default: 0,
  },

}, {
  timestamps: true,
})

const CodeStorage = mongoose.model('CodeStorage', CodeStorageSchema)
module.exports = CodeStorage