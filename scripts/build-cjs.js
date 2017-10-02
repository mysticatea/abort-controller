"use strict"

const rollup = require("rollup")
const banner = `/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */`
const outro = `module.exports = AbortController
module.exports.AbortController = module.exports["default"] = AbortController
module.exports.AbortSignal = AbortSignal
`

;(async () => {
    const bundle = await rollup.rollup({
        input: "src/abort-controller.mjs",
        external: ["event-target-shim"],
        plugins: [],
    })
    await bundle.write({
        file: "dist/abort-controller.js",
        sourcemapFile: "dist/abort-controller.js.map",
        sourcemap: true,
        format: "cjs",
        banner,
        outro,
    })
})().catch(error => {
    console.error(error)
    process.exitCode = 1
})
