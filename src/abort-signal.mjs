import { EventTarget, defineEventAttribute } from "event-target-shim"

/**
 * Aborted flag for each instances.
 * @type {WeakMap<AbortSignal, boolean>}
 */
const abortedFlags = new WeakMap()

/**
 * The signal class.
 * @constructor
 * @name AbortSignal
 * @see https://dom.spec.whatwg.org/#abortsignal
 */
export default class AbortSignal extends EventTarget {
    /**
     * AbortSignal cannot be constructed directly.
     */
    constructor() {
        super()
        throw new TypeError("AbortSignal cannot be constructed directly")
    }

    /**
     * Returns `true` if this `AbortSignal`'s `AbortController` has signaled to abort, and `false` otherwise.
     * @type {boolean}
     */
    get aborted() {
        const aborted = abortedFlags.get(this)
        if (typeof aborted !== "boolean") {
            throw new TypeError(
                `Expected 'this' to be an 'AbortSignal' object, but got ${
                    this === null ? "null" : typeof this
                }`
            )
        }
        return aborted
    }

    /**
     * The event attribute for `abort` event.
     * @property
     * @memberof AbortSignal
     * @name onabort
     * @type {Function}
     */
}

// Properties should be enumerable.
Object.defineProperties(AbortSignal.prototype, {
    aborted: {
        enumerable: true,
    },
})

if (typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol") {
    Object.defineProperty(AbortSignal.prototype, Symbol.toStringTag, {
        configurable: true,
        value: "AbortSignal",
    })
}

defineEventAttribute(AbortSignal.prototype, "abort")

/**
 * Create an AbortSignal object.
 * @returns {AbortSignal} The created AbortSignal object.
 */
export function createAbortSignal() {
    const signal = Object.create(AbortSignal.prototype)
    EventTarget.call(signal)
    abortedFlags.set(signal, false)
    return signal
}

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
