'use strict'

const FlyingStorage = require('../model/flyingStorage')

const create = (collectionId, data) => 
  new FlyingStorage({ collectionId, data }).save()

const getById = (_id) => 
  FlyingStorage.findOne({ _id })
    .exec()

const getByCollectionId = (collectionId) => 
  FlyingStorage.find({ collectionId })
    .exec()

const updateDataById = (_id, data) => 
  FlyingStorage.update({_id }, {$set: { data }}).exec()

const remove = (_id) =>
  FlyingStorage.findOne({ _id }).remove().exec()

module.exports = {
  create,
  getById,
  getByCollectionId,
  updateDataById,
  remove,
}