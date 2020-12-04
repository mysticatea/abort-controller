'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

module.exports = global.AbortController
  ? {
    AbortController: global.AbortController,
    AbortSignal: global.AbortSignal
  }
  : require('./dist/abort-controller.js');

exports.AbortController = module.exports.AbortController;
exports.AbortSignal = module.exports.AbortSignal;
