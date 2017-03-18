'use strict'

const router = require('express').Router()
const createSelfUrl = require('../../lib/middleware/createSelfUrl')
const getFlyingFunctionData = require('../../lib/middleware/getFlyingFunctionData')
const getAllFlyingFunctionHooksWithId = require('../../lib/middleware/getAllFlyingFunctionHooksWithId')
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
  .get('/:id/:name', getAllFlyingFunctionHooksWithId, getFlyingFunctionData, createSelfUrl, run)
  .post('/:id/:name', getAllFlyingFunctionHooksWithId, getFlyingFunctionData, createSelfUrl, run)
  /**
   * Create: flying function
   */
  .post('/', create)
  // TODO: implement
  .put('/:id', () => {})
  .delete('/:id', () => {})

module.exports = router