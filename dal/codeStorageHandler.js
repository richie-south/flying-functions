'use strict'

const CodeStorage = require('../model/CodeStorage')

const create = (code, name, invocations = 0) => 
  new CodeStorage({ code, name, invocations, urlId: '00' }).save()

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

/*const update = (_id, title, content) =>
  CodeStorage.update({ _id }, { title, content }).exec()*/

module.exports = {
  create,
  getById,
  getAll,
  /*update, */
  getByUrlId,
  remove,
  updateInvocations,
}