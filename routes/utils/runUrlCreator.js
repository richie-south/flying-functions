'use strict'

const urlCreator = (host, name, id) => process.env.DEV ? 
  `${host}/flying/${id}/${name}` :
  `http://${host}/projectflying/flying/${id}/${name}`

module.exports = urlCreator