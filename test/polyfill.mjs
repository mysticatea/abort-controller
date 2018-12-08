/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
import "../polyfill"
import { assert } from "./lib/util.mjs"

const IN_BROWSER = (typeof window !== "undefined")

//
;(IN_BROWSER ? describe : xdescribe)("abort-controller/polyfill", () => {
    describe("window.AbortController", () => {
        it("should not be undefined.", () => {
            assert(typeof window.AbortController !== "undefined")
        })
    })

    describe("window.AbortSignal", () => {
        it("should not be undefined.", () => {
            assert(typeof window.AbortSignal !== "undefined")
        })
    })
})
