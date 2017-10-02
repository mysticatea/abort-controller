/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */

// I could not use `assert` module because of https://github.com/defunctzombie/node-util/issues/10
// I could not use `power-assert` module because of `isImportDefaultSpecifier` not found error.
import chai from "chai"
const assert = chai.assert

// `spy/index.js` has `require("module")`, so it's problem in karma.
import spy from "spy/lib/spy"

// Test target.
import { AbortController, AbortSignal } from "../src/abort-controller.mjs"

/*globals EventTarget */

const HAS_EVENT_TARGET_INTERFACE = (typeof EventTarget !== "undefined")

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

describe("AbortController", () => {
    let controller = null

    beforeEach(() => {
        controller = new AbortController()
    })

    it("should have 2 properties", () => {
        // IE does not support Set constructor.
        const keys = new Set()
        keys.add("signal")
        keys.add("abort")

        for (const key in controller) {
            assert(keys.has(key), `'${key}' found, but should not have it`)
            keys.delete(key)
        }

        keys.forEach(key => {
            assert(false, `'${key}' not found`)
        })
    })

    describe("'signal' property", () => {
        let signal = null

        beforeEach(() => {
            signal = controller.signal
        })

        it("should return the same instance always", () => {
            assert(signal === controller.signal)
        })

        it("should be a AbortSignal object", () => {
            assert(signal instanceof AbortSignal)
        })

        ;(HAS_EVENT_TARGET_INTERFACE ? it : xit)("should be a EventTarget object", () => {
            assert(signal instanceof EventTarget)
        })

        it("should have 5 properties", () => {
            // IE does not support Set constructor.
            const keys = new Set()
            keys.add("addEventListener")
            keys.add("removeEventListener")
            keys.add("dispatchEvent")
            keys.add("aborted")
            keys.add("onabort")

            for (const key in signal) {
                assert(keys.has(key), `'${key}' found, but should not have it`)
                keys.delete(key)
            }

            keys.forEach(key => {
                assert(false, `'${key}' not found`)
            })
        })

        it("should have 'aborted' property which is false by default", () => {
            assert(signal.aborted === false)
        })

        it("should have 'onabort' property which is null by default", () => {
            assert(signal.onabort === null)
        })
    })

    describe("'abort' method", () => {
        it("should set true to 'signal.aborted' property", () => {
            controller.abort()
            assert(controller.signal.aborted)
        })

        it("should fire 'abort' event on 'signal' (addEventListener)", () => {
            const listener = spy()
            controller.signal.addEventListener("abort", listener)
            controller.abort()

            assert(listener.callCount === 1)
        })

        it("should fire 'abort' event on 'signal' (onabort)", () => {
            const listener = spy()
            controller.signal.onabort = listener
            controller.abort()

            assert(listener.callCount === 1)
        })

        it("should not fire 'abort' event twice", () => {
            const listener = spy()
            controller.signal.addEventListener("abort", listener)
            controller.abort()
            controller.abort()
            controller.abort()

            assert(listener.callCount === 1)
        })
    })
})