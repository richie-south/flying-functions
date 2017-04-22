'use strict'

const mongoose = require('mongoose')

const FlyingStorageSchema = mongoose.Schema({
  
  data: {
    type: Object,
    required: [true, 'You need to store somthing'],
  },

  collectionId: {
    type: String,
    required: [true, 'Flying function id is required'],
  },

}, {
  timestamps: true,
})

const FlyingStorage = mongoose.model('FlyingStorage', FlyingStorageSchema)
module.exports = FlyingStorage