'use strict'

const CodeStorage = require('../model/CodeStorage')

const create = (code, name, invocations = 0) => 
  new CodeStorage({ code, name, invocations }).save()

const getById = (_id) => 
  CodeStorage.findOne({ _id })
  .exec()

const updateInvocations = (_id, invocations) => 
  CodeStorage.update({_id }, {$set: { invocations }}).exec()

const getAll = () => 
  CodeStorage.find({}).exec()


/*const update = (_id, title, content) =>
  CodeStorage.update({ _id }, { title, content }).exec()

const remove = (_id) =>
  CodeStorage.findOne({ _id }).remove().exec()*/

module.exports = {
  create,
  getById,
  getAll,
  /*update,
  remove,*/
  updateInvocations,
}