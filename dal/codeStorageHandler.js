'use strict'

const CodeStorage = require('../model/CodeStorage')

const create = (code, originalCode, name, invocations = 0) => 
  new CodeStorage({ code, originalCode, name, invocations, urlId: '00' }).save()

const getById = (_id) => 
  CodeStorage.findOne({ _id })
    .exec()

const getByUrlId = (urlId) => 
  CodeStorage.findOne({ urlId })
    .exec()

const updateInvocations = (_id, invocations) => 
  CodeStorage.update({_id }, {$set: { invocations }}).exec()

const getAll = () => 
  CodeStorage.find({}).exec()

const remove = (_id) =>
  CodeStorage.findOne({ _id }).remove().exec()

const update = (_id, code, originalCode) =>
  CodeStorage.update({ _id }, { code, originalCode }).exec()

module.exports = {
  create,
  getById,
  getAll,
  update, 
  getByUrlId,
  remove,
  updateInvocations,
}