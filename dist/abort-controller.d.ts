declare module "abort-controller" {
    export interface AbortEvent {
        /**
         * Returns true or false depending on how event was initialized. True if event goes through its target's ancestors in reverse tree order, and false otherwise.
         */
        readonly bubbles: boolean;
        readonly cancelable: boolean;
        /**
         * Returns true or false depending on how event was initialized. True if event invokes listeners past a ShadowRoot node that is the root of its target, and false otherwise.
         */
        readonly composed: boolean;
        /**
         * Returns the object whose event listener's callback is currently being
         * invoked.
         */
        readonly currentTarget: AbortSignal;
        readonly defaultPrevented: boolean;
        readonly eventPhase: number;
        /**
         * Returns true if event was dispatched by the user agent, and
         * false otherwise.
         */
        readonly isTrusted: boolean;
        /**
         * Returns the object to which event is dispatched (its target).
         */
        readonly target: AbortSignal;
        /**
         * Returns the event's timestamp as the number of milliseconds measured relative to
         * the time origin.
         */
        readonly timeStamp: number;
        /**
         * Returns the type of event, e.g.
         * "click", "hashchange", or
         * "submit".
         */
        readonly type: 'abort';
        composedPath(): AbortSignal[];
        preventDefault(): void;
        /**
         * Invoking this method prevents event from reaching
         * any registered event listeners after the current one finishes running and, when dispatched in a tree, also prevents event from reaching any
         * other objects.
         */
        stopImmediatePropagation(): void;
        /**
         * When dispatched in a tree, invoking this method prevents event from reaching any objects other than the current object.
         */
        stopPropagation(): void;
        readonly AT_TARGET: number;
        readonly BUBBLING_PHASE: number;
        readonly CAPTURING_PHASE: number;
        readonly NONE: number;
    }
    
    export interface EventListenerOptions {
        capture?: boolean;
    }
    
    export interface AddEventListenerOptions extends EventListenerOptions {
        once?: boolean;
        passive?: boolean;
    }
    
    export interface AbortSignal {
        /**
         * Returns true if this AbortSignal's AbortController has signaled to abort, and false
         * otherwise.
         */
        readonly aborted: boolean;
        onabort: ((this: AbortSignal, ev: AbortEvent) => any) | null;
        addEventListener(type: 'abort', listener: (this: AbortSignal, ev: AbortEvent) => any, options?: boolean | AddEventListenerOptions): void;
        removeEventListener(type: 'abort', listener: (this: AbortSignal, ev: AbortEvent) => any, options?: boolean | EventListenerOptions): void;
    }

    export interface AbortController {
        /**
         * Returns the AbortSignal object associated with this object.
         */
        readonly signal: AbortSignal;
        /**
         * Invoking this method will set this object's AbortSignal's aborted flag and
         * signal to any observers that the associated activity is to be aborted.
         */
        abort(): void;
    }

    export const AbortSignal: {
        prototype: AbortSignal;
    };
    export const AbortController: {
        prototype: AbortController;
        new(): AbortController;
    };
    export default AbortController;
}
