'use strict'

const evaljs = require('evaljs')

const globals = {
  console,
  Number,
  Math,
  Promise,
}

const run = (iter) => {
  let result = iter.next()
  while(!result.done) {
    result = iter.next()
  }
  return result.value
}

const runCode = (code, args) => {
  const env = new evaljs.Environment([globals])
  const ittr = env.gen(code)()
  return run(run(ittr)(args))
}

module.exports = runCode