import AbortSignal, { abortSignal } from "./abort-signal.mjs"

/**
 * Associated signals.
 * @type {WeakMap<AbortController, AbortSignal>}
 */
const signals = new WeakMap()

/**
 * Get the associated signal of a given controller.
 * @param {AbortController} controller The controller to get its associated signal.
 * @returns {AbortSignal} The associated signal.
 */
function getSignal(controller) {
    const signal = signals.get(controller)
    console.assert(signal != null, "Expected 'this' to be an 'AbortController' object, but got", controller)
    return signal
}

/**
 * The AbortController.
 * @constructor
 * @see https://dom.spec.whatwg.org/#abortcontroller
 */
export default function AbortController() {
    signals.set(this, new AbortSignal())
}

// Properties should be enumerable.
Object.defineProperties(AbortController.prototype, {
    /**
     * Returns the `AbortSignal` object associated with this object.
     * @type {AbortSignal}
     */
    signal: {
        get: function get_signal() { //eslint-disable-line camelcase
            return getSignal(this)
        },
        configurable: true,
        enumerable: true,
    },

    /**
     * Abort and signal to any observers that the associated activity is to be aborted.
     * @returns {void}
     */
    abort: {
        value: function abort() {
            // Not depend on this.signal which is overridable.
            const signal = getSignal(this)
            if (signal != null) {
                abortSignal(signal)
            }
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
})

export { AbortController, AbortSignal }
