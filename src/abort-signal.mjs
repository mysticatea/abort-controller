import { EventTarget, defineEventAttribute } from "event-target-shim"

/**
 * Aborted flag for each instances.
 * @type {WeakMap<AbortSignal, boolean>}
 */
const abortedFlags = new WeakMap()

/**
 * The signal class.
 * @constructor
 * @see https://dom.spec.whatwg.org/#abortsignal
 */
export default function AbortSignal() {
    EventTarget.call(this)
    abortedFlags.set(this, false)
}

// Properties should be enumerable.
AbortSignal.prototype = Object.create(EventTarget.prototype, {
    constructor: {
        value: AbortSignal,
        configurable: true,
        writable: true,
    },

    /**
     * Returns `true` if this `AbortSignal`'s `AbortController` has signaled to abort, and `false` otherwise.
     * @property
     * @memberof AbortSignal
     * @name aborted
     * @type {boolean}
     */
    aborted: {
        get: function get_aborted() { //eslint-disable-line camelcase
            const aborted = abortedFlags.get(this)
            console.assert(typeof aborted === "boolean", "Expected 'this' to be an 'AbortSignal' object, but got", this)
            return Boolean(aborted)
        },
        configurable: true,
        enumerable: true,
    },

    /**
     * The event attribute for `abort` event.
     * @property
     * @memberof AbortSignal
     * @name onabort
     * @type {Function}
     */
})

defineEventAttribute(AbortSignal.prototype, "abort")

/**
 * Abort a given signal.
 * @param {AbortSignal} signal The signal to abort.
 * @returns {void}
 */
export function abortSignal(signal) {
    if (abortedFlags.get(signal) !== false) {
        return
    }

    abortedFlags.set(signal, true)
    signal.dispatchEvent({ type: "abort" })
}
