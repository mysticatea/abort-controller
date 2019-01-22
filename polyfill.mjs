/*globals self, window */
import * as ac from "."

/*eslint-disable no-shadow, @mysticatea/prettier */
const global =
    typeof window !== "undefined" ? window :
    typeof self !== "undefined" ? self :
    /* otherwise */ undefined
/*eslint-enable no-shadow, @mysticatea/prettier */

if (global) {
    if (typeof global.AbortController === "undefined") {
        global.AbortController = ac.AbortController
    }
    if (typeof global.AbortSignal === "undefined") {
        global.AbortSignal = ac.AbortSignal
    }
}
