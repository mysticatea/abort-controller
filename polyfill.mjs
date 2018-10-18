import * as ac from "./dist/abort-controller"

if (typeof window !== "undefined") {
    if (typeof window.AbortController === "undefined") {
        window.AbortController = ac.AbortController
    }
    if (typeof window.AbortSignal === "undefined") {
        window.AbortSignal = ac.AbortSignal
    }
}
