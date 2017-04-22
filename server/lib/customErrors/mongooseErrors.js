'use strict'

/**
 * [mongoose object checks if mongoose throws castError]
 * @param  {objet} e
 */
const isCastError = e =>
  e.name && 
    e.name === 'CastError'

/**
 * [mongoose object checks if mongoose throws validatorError]
 * @param  {objet} e
 */
const isValidatorError = e =>
  e.name && 
    e.name === 'ValidatorError'


module.exports = {
  isCastError,
  isValidatorError,
}
