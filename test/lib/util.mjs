/**
 * Assert a condition.
 *
 * - I could not use `assert` module because of https://github.com/defunctzombie/node-util/issues/10
 * - I could not use `power-assert` module because of `isImportDefaultSpecifier` not found error.
 *
 * @param {boolean} condition The condition to assert.
 * @param {string} [message] The assertion message.
 * @returns {void}
 */
export function assert(condition, message) {
    if (!condition) {
        throw new Error(`AssertionError: ${message || "(no message)"}`)
    }
}

/**
 * Verify that a given function throws an error.
 * @param {function} f The consequence to verify.
 * @param {function} [type=Error] The constructor of the expected error. Default is Error.
 * @returns {void}
 */
assert.throws = (f, type) => {
    try {
        f()
    }
    catch (e) {
        assert(e instanceof (type || Error))
        return
    }
    throw new Error(`AssertionError: should throw a ${(type || Error).name} object`)
}

/**
 * Create a spy function.
 * @returns {function} spy function. This has `callCount` property.
 */
export function spy() {
    /** @returns {void} */
    function f() {
        f.callCount += 1
    }

    f.callCount = 0

    return f
}
