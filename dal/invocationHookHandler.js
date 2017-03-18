'use strict'

const InvocationHook = require('../model/InvocationHook')

const create = (url, functionToInvocId) => 
  new InvocationHook({ url, functionToInvocId }).save()

const getById = (_id) => 
  InvocationHook.findOne({ _id })
  .exec()

const findByFlyingFunctionId = (functionToInvocId) => 
  InvocationHook.find({ functionToInvocId })
  .exec()

const getAll = () => 
  InvocationHook.find({}).exec()

const remove = (_id) =>
  InvocationHook.findOne({ _id }).remove().exec()

module.exports = {
  create,
  getById,
  getAll,
  remove,
  findByFlyingFunctionId,
}