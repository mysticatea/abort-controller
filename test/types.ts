import { AbortController as AbortControllerShim, AbortSignal as AbortSignalShim } from "..";

function signalCallback(as: AbortSignal) { }
function signalShimCallback(as: AbortSignalShim) { }
function controllerCallback(ac: AbortController) { }
function controllerShimCallback(ac: AbortControllerShim) { }
function abortCallback(this: AbortSignal, ev: Event) { }

const controller = new AbortController();
const controllerShim = new AbortControllerShim();
const signal = controller.signal;
const signalShim = controllerShim.signal;

signalCallback(signal);
signalCallback(signalShim);

signalShimCallback(signal);
signalShimCallback(signalShim);

controllerCallback(controller);
controllerCallback(controllerShim);

controllerShimCallback(controller);
controllerShimCallback(controllerShim);

if (!signalShim.aborted) {
    signalShim.addEventListener("abort", abortCallback);
    signalShim.removeEventListener("abort", abortCallback);
    signalShim.onabort = abortCallback;
}
controllerShim.abort();
