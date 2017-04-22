'use strict'

const router = require('express').Router()
const createSelfUrl = require('../../lib/middleware/createSelfUrl')
const getFlyingFunctionData = require('../../lib/middleware/getFlyingFunctionData')
const checkHttpType = require('../../lib/middleware/checkHttpType')
const updateInvocations = require('../../lib/middleware/updateInvocations')
const run = require('./run')
const update = require('./update')
const create = require('./create')
const view = require('./view')
const viewAll = require('./viewAll')
const remove = require('./remove')

router
  /**
   * List All: flying functions
   * REMOVE THIS LATER
   */
  .get('/', viewAll)
  /**
   * View: flying function
   */
  .get('/:id', getFlyingFunctionData, createSelfUrl, view)
  /**
   * Run: flying function
   */
  .get('/:id/:name', getFlyingFunctionData.ByUrlId, checkHttpType, createSelfUrl, updateInvocations, run)
  .post('/:id/:name', getFlyingFunctionData.ByUrlId, checkHttpType, createSelfUrl, updateInvocations, run)
  /**
   * Create: flying function
   */
  .post('/', create)
  // TODO: implement
  .put('/:id', update)
  /**
   * Delete: removes flying function
   */
  .delete('/:id', remove)

module.exports = router