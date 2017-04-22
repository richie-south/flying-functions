'use strict'

const rp = require('request-promise')
const mulig = require('mulig')

const invcocateFlyingWebhooks = (webhooks, payload) => {
  mulig(webhooks.map((hook) => 
    rp({
      uri: hook.url,
      method: 'POST',
      body: payload,
      json: true,
    }))
  ) // swallow errors
}

module.exports = invcocateFlyingWebhooks
