'use strict'

const urlCreator = (host, name, id) => 
  `http://${host}/projectflying/flying/${id}/${name}`

module.exports = urlCreator