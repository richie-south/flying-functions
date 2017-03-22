'use strict'

const router = require('express').Router()
//const isURL = require('../../lib/middleware/isURL')
const getFlyingFunctionData = require('../../lib/middleware/getFlyingFunctionData')
const create = require('./create')
const remove = require('./remove')

router
  /**
   * Create new hook
   */
  .post('/:id', getFlyingFunctionData, create)
  /**
   * Delete: removes webhook
   */
  .delete('/:id', remove)

module.exports = router