'use strict'

const mongoose = require('mongoose')

const InvocationHookSchema = mongoose.Schema({
  
  url: {
    type: String, 
    required: [true, 'Url is required'],
  },

  functionToInvocId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'CodeStorage',
  },

}, {
  timestamps: true,
})

InvocationHookSchema.pre('save', function(next) {

  const { 
    functionToInvocId,
    url,
  } = this

  const regex = new RegExp(functionToInvocId.toString())

  regex.exec(url) === null ? 
    next() : 
    next(new Error('webhook url cant ref self'))
})

const InvocationHook = mongoose.model('InvocationHook', InvocationHookSchema)
module.exports = InvocationHook