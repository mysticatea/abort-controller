/*globals require, self, window */
"use strict"

const ac = require(".")

/*eslint-disable @mysticatea/prettier */
const global =
    typeof window !== "undefined" ? window :
    typeof self !== "undefined" ? self :
    /* otherwise */ undefined
/*eslint-enable @mysticatea/prettier */

if (global) {
    if (typeof global.AbortController === "undefined") {
        global.AbortController = ac.AbortController
    }
    if (typeof global.AbortSignal === "undefined") {
        global.AbortSignal = ac.AbortSignal
    }
}
