import { 
    Event, 
    EventTarget, 
    AddEventListenerOptions, 
    EventListenerOptions,
    EventTargetListener
 } from "event-target-shim";

export as namespace AbortControllerShim;

/**
 * Temporary event type to keep typescript happy.
 */
interface ProgressEvent extends Event {
    readonly lengthComputable: any;
    readonly loaded: any;
    readonly total: any;
}

export type AbortSignalListener = (this: AbortSignal, ev: ProgressEvent) => any;

export class AbortSignal extends EventTarget {
    private constructor();

    /**
     * Returns true if this AbortSignal's AbortController has signaled to abort, and false
     * otherwise.
     */
    readonly aborted: boolean;
    onabort: AbortSignalListener | null;
    addEventListener(type: "abort", listener: AbortSignalListener, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventTargetListener | null, options?: boolean | AddEventListenerOptions): void;
    removeEventListener(type: "abort", listener: AbortSignalListener, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventTargetListener | null, options?: boolean | EventListenerOptions): void;
}

export class AbortController {
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
export default AbortController;
