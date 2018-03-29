/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
import { EventTarget, defineEventAttribute } from 'event-target-shim';

/**
 * Aborted flag for each instances.
 * @type {WeakMap<AbortSignal, boolean>}
 */
const abortedFlags = new WeakMap();

/**
 * The signal class.
 * @constructor
 * @name AbortSignal
 * @see https://dom.spec.whatwg.org/#abortsignal
 */
class AbortSignal extends EventTarget {
    /**
     * AbortSignal cannot be constructed directly.
     */
    constructor() {
        super();
        throw new TypeError("AbortSignal cannot be constructed directly")
    }

    /**
     * Returns `true` if this `AbortSignal`'s `AbortController` has signaled to abort, and `false` otherwise.
     * @type {boolean}
     */
    get aborted() {
        const aborted = abortedFlags.get(this);
        if (typeof aborted !== "boolean") {
            throw new TypeError(`Expected 'this' to be an 'AbortSignal' object, but got ${this === null ? "null" : typeof this}`)
        }
        return Boolean(aborted)
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
});

if (typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol") { //eslint-disable-line node/no-unsupported-features
    Object.defineProperty(AbortSignal.prototype, Symbol.toStringTag, { //eslint-disable-line node/no-unsupported-features
        configurable: true,
        value: "AbortSignal",
    });
}

defineEventAttribute(AbortSignal.prototype, "abort");

/**
 * Create an AbortSignal object.
 * @returns {AbortSignal} The created AbortSignal object.
 */
function createAbortSignal() {
    const signal = Object.create(AbortSignal.prototype);
    EventTarget.call(signal);
    abortedFlags.set(signal, false);
    return signal
}

/**
 * Abort a given signal.
 * @param {AbortSignal} signal The signal to abort.
 * @returns {void}
 */
function abortSignal(signal) {
    if (abortedFlags.get(signal) !== false) {
        return
    }

    abortedFlags.set(signal, true);
    signal.dispatchEvent({ type: "abort" });
}

/**
 * Associated signals.
 * @type {WeakMap<AbortController, AbortSignal>}
 */
const signals = new WeakMap();

/**
 * Get the associated signal of a given controller.
 * @param {AbortController} controller The controller to get its associated signal.
 * @returns {AbortSignal} The associated signal.
 */
function getSignal(controller) {
    const signal = signals.get(controller);
    if (signal == null) {
        throw new TypeError(`Expected 'this' to be an 'AbortController' object, but got ${controller === null ? "null" : typeof controller}`)
    }
    return signal
}

/**
 * The AbortController.
 * @see https://dom.spec.whatwg.org/#abortcontroller
 */
class AbortController {
    /**
     * Initialize this controller.
     */
    constructor() {
        signals.set(this, createAbortSignal());
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
        const signal = getSignal(this);
        if (signal != null) {
            abortSignal(signal);
        }
    }
}

// Properties should be enumerable.
Object.defineProperties(AbortController.prototype, {
    signal: { enumerable: true },
    abort: { enumerable: true },
});

if (typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol") { //eslint-disable-line node/no-unsupported-features
    Object.defineProperty(AbortController.prototype, Symbol.toStringTag, { //eslint-disable-line node/no-unsupported-features
        configurable: true,
        value: "AbortController",
    });
}

export default AbortController;
export { AbortController, AbortSignal };
//# sourceMappingURL=abort-controller.mjs.map
