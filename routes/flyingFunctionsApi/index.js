'use strict'

const router = require('express').Router()
const createSelfUrl = require('../../lib/middleware/createSelfUrl')
const getFlyingFunctionData = require('../../lib/middleware/getFlyingFunctionData')
const run = require('./run')
const create = require('./create')
const view = require('./view')
const viewAll = require('./viewAll')

router
  /**
   * List All: flying functions
   */
  .get('/', viewAll)
  /**
   * View: flying function
   */
  .get('/:id', getFlyingFunctionData, createSelfUrl, view)
  /**
   * Run: flying function
   */
  .get('/:id/:name', getFlyingFunctionData, createSelfUrl, run)
  /**
   * Create: flying function
   */
  .post('/', create)
  /**
   * Add webhook for function invocation
   */
  .post('/webhook', () => {})
  // TODO: implement
  .put('/:id', () => {})
  .delete('/:id', () => {})

module.exports = router