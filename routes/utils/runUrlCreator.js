'use strict'

const urlCreator = (host, name, id) => 
  `${host}/flying/${id}/${name}`

module.exports = urlCreator