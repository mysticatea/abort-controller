"use strict"

const rollup = require("rollup")
const banner = `/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */`

;(async () => {
    const bundle = await rollup.rollup({
        input: "src/abort-controller.mjs",
        external: ["event-target-shim"],
        plugins: [],
    })
    await bundle.write({
        file: "dist/abort-controller.mjs",
        sourcemapFile: "dist/abort-controller.mjs.map",
        sourcemap: true,
        format: "es",
        banner,
    })
})().catch(error => {
    console.error(error)
    process.exitCode = 1
})
