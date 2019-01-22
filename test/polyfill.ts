/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
import assert from "assert"
import "../polyfill"

const IN_BROWSER = typeof window !== "undefined" || typeof self !== "undefined"

//
;(IN_BROWSER ? describe : xdescribe)("abort-controller/polyfill", () => {
    describe("window.AbortController", () => {
        it("should not be undefined.", () => {
            assert(typeof AbortController !== "undefined")
        })
    })

    describe("window.AbortSignal", () => {
        it("should not be undefined.", () => {
            assert(typeof AbortSignal !== "undefined")
        })
    })
})
