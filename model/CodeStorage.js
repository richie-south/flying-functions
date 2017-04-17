'use strict'

const mongoose = require('mongoose')
const shortid = require('shortid')

const CodeStorageSchema = mongoose.Schema({
  
  urlId: {
    type: String,
    required: [true, 'Missing urlId']
  },

  name: {
    type: String,
    required: [true, 'Name is required'],
  },

  code: {
    type: String, 
    required: [true, 'Code is required'],
  },

  originalCode: {
    type: String,
    required: [true, 'Original code must be saved']
  },

  invocations: {
    type: Number,
    default: 0,
  },

}, {
  timestamps: true,
})

CodeStorageSchema.pre('save', function(next) {
  
  /**
   * checks if urlId is used before
   * re-runs until uniq urlId
   */
  const checkAvailability = async () => {
    const urlId = shortid.generate() //`${shortid.generate()}${shortid.generate()}`
    const flyingFunction = await CodeStorage.findOne({ urlId }).exec()

    if(flyingFunction === null){
      this.urlId = urlId
      return next()
    }else{
      await checkAvailability()
    }
  }

  checkAvailability()
    .catch(error => next(error)) 
})

const CodeStorage = mongoose.model('CodeStorage', CodeStorageSchema)
module.exports = CodeStorage