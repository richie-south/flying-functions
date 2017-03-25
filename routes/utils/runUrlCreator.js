'use strict'

const urlCreator = (host, name, id) => 
  `https://${host}/projectflying/flying/${id}/${name}`

module.exports = urlCreator