import {
    // Event,
    EventTarget,
    // Type,
    defineEventAttribute,
} from "event-target-shim"

// Known Limitation
//   Use `any` because the type of `AbortSignal` in `lib.dom.d.ts` is wrong and
//   to make assignable our `AbortSignal` into that.
//   https://github.com/Microsoft/TSJS-lib-generator/pull/623
type Events = {
    abort: any // Event & Type<"abort">
}
type EventAttributes = {
    onabort: any // Event & Type<"abort">
}

/**
 * The signal class.
 * @constructor
 * @name AbortSignal
 * @see https://dom.spec.whatwg.org/#abortsignal
 */
export default class AbortSignal extends EventTarget<Events, EventAttributes> {
    /**
     * AbortSignal cannot be constructed directly.
     */
    public constructor() {
        super()
        throw new TypeError("AbortSignal cannot be constructed directly")
    }

    /**
     * Returns `true` if this `AbortSignal`'s `AbortController` has signaled to abort, and `false` otherwise.
     */
    public get aborted(): boolean {
        const aborted = abortedFlags.get(this)
        if (typeof aborted !== "boolean") {
            throw new TypeError(
                `Expected 'this' to be an 'AbortSignal' object, but got ${
                    this === null ? "null" : typeof this
                }`,
            )
        }
        return aborted
    }
}
defineEventAttribute(AbortSignal.prototype, "abort")

/**
 * Create an AbortSignal object.
 */
export function createAbortSignal(): AbortSignal {
    const signal = Object.create(AbortSignal.prototype)
    EventTarget.call(signal)
    abortedFlags.set(signal, false)
    return signal
}

/**
 * Abort a given signal.
 */
export function abortSignal(signal: AbortSignal): void {
    if (abortedFlags.get(signal) !== false) {
        return
    }

    abortedFlags.set(signal, true)
    signal.dispatchEvent<"abort">({ type: "abort" })
}

/**
 * Aborted flag for each instances.
 */
const abortedFlags = new WeakMap<AbortSignal, boolean>()

// Properties should be enumerable.
Object.defineProperties(AbortSignal.prototype, {
    aborted: { enumerable: true },
})

// `toString()` should return `"[object AbortSignal]"`
if (typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol") {
    Object.defineProperty(AbortSignal.prototype, Symbol.toStringTag, {
        configurable: true,
        value: "AbortSignal",
    })
}
