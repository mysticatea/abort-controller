/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var eventTargetShim = require('event-target-shim');

/**
 * Aborted flag for each instances.
 * @type {WeakMap<AbortSignal, boolean>}
 */
const abortedFlags = new WeakMap();

/**
 * The signal class.
 * @constructor
 * @see https://dom.spec.whatwg.org/#abortsignal
 */
function AbortSignal() {
    eventTargetShim.EventTarget.call(this);
    abortedFlags.set(this, false);
}

// Properties should be enumerable.
AbortSignal.prototype = Object.create(eventTargetShim.EventTarget.prototype, {
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
            const aborted = abortedFlags.get(this);
            console.assert(typeof aborted === "boolean", "Expected 'this' to be an 'AbortSignal' object, but got", this);
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
});

eventTargetShim.defineEventAttribute(AbortSignal.prototype, "abort");

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
    console.assert(signal != null, "Expected 'this' to be an 'AbortController' object, but got", controller);
    return signal
}

/**
 * The AbortController.
 * @constructor
 * @see https://dom.spec.whatwg.org/#abortcontroller
 */
function AbortController() {
    signals.set(this, new AbortSignal());
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
            const signal = getSignal(this);
            if (signal != null) {
                abortSignal(signal);
            }
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
});

exports['default'] = AbortController;
exports.AbortController = AbortController;
exports.AbortSignal = AbortSignal;

module.exports = AbortController
module.exports.AbortController = module.exports["default"] = AbortController
module.exports.AbortSignal = AbortSignal
//# sourceMappingURL=abort-controller.js.map
