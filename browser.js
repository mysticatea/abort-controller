'use strict'
// ref: https://github.com/tc39/proposal-global
var getGlobal = function() {
  // the only reliable means to get the global object is
  // `Function('return this')()`
  // However, this causes CSP violations in Chrome apps.
  if (typeof self !== 'undefined') {
    return self
  }
  if (typeof window !== 'undefined') {
    return window
  }
  if (typeof global !== 'undefined') {
    return global
  }
  throw new Error('unable to locate global object')
}

var global = getGlobal()

module.exports = exports = global.AbortController
// Needed for TypeScript and Webpack.
exports.default = global.AbortController
