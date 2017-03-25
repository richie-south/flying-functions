'use strict'

const urlCreator = (host, name, id) => process.env.DEV === 'false' ? 
  `${host}/flying/${id}/${name}` :
  `https://${host}/projectflying/flying/${id}/${name}`

module.exports = urlCreator