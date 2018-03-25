import AbortSignal, { abortSignal, createAbortSignal } from "./abort-signal.mjs"

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
    if (signal == null) {
        throw new TypeError(`Expected 'this' to be an 'AbortController' object, but got ${controller === null ? "null" : typeof controller}`)
    }
    return signal
}

/**
 * The AbortController.
 * @see https://dom.spec.whatwg.org/#abortcontroller
 */
export default class AbortController {
    /**
     * Initialize this controller.
     */
    constructor() {
        signals.set(this, createAbortSignal())
    }

    /**
     * Returns the `AbortSignal` object associated with this object.
     * @type {AbortSignal}
     */
    get signal() {
        return getSignal(this)
    }

    /**
     * Abort and signal to any observers that the associated activity is to be aborted.
     * @returns {void}
     */
    abort() {
        // Not depend on this.signal which is overridable.
        const signal = getSignal(this)
        if (signal != null) {
            abortSignal(signal)
        }
    }
}

// Properties should be enumerable.
Object.defineProperties(AbortController.prototype, {
    signal: { enumerable: true },
    abort: { enumerable: true },
})

export { AbortController, AbortSignal }
