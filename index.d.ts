import { Event, EventTarget } from "event-target-shim";

declare module "abort-controller" {  
    export class AbortSignal extends EventTarget {
        private constructor();
    
        /**
         * Returns true if this AbortSignal's AbortController has signaled to abort, and false
         * otherwise.
         */
        readonly aborted: boolean;
        onabort: ((this: this, ev: Event) => any) | null;
    }
    
    export default class AbortController {
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
}
