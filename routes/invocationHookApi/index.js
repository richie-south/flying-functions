'use strict'

const router = require('express').Router()
const isURL = require('../../lib/middleware/isURL')
const getFlyingFunctionData = require('../../lib/middleware/getFlyingFunctionData')
const create = require('./create')

router
  /**
   * Create new hook
   */
  .post('/:id', isURL, getFlyingFunctionData, create)
  /**
   * TODO: implement
   */
  .delete('/:id', () => {})

module.exports = router