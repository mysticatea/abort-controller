/*globals require */
const ac = require("./dist/abort-controller")

if (typeof window !== "undefined") {
    if (typeof window.AbortController === "undefined") {
        window.AbortController = ac.AbortController
    }
    if (typeof window.AbortSignal === "undefined") {
        window.AbortSignal = ac.AbortSignal
    }
}
