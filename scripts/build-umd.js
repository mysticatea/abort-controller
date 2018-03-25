"use strict"

const rollup = require("rollup")
const resolve = require("rollup-plugin-node-resolve")
const babel = require("rollup-plugin-babel")
const minify = require("rollup-plugin-babel-minify")
const banner = `/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */`
const outro = `if (typeof module === "undefined" && typeof define === "undefined") {
    const global = Function("return this")()
    if (typeof global.AbortController === "undefined") {
        global.AbortController = AbortController
        global.AbortSignal = AbortSignal
    }
}
`

;(async () => {
    const bundle = await rollup.rollup({
        input: "src/abort-controller.mjs",
        plugins: [
            resolve({ extensions: [".mjs"] }),
            babel({
                babelrc: false,
                include: "**/*.{js,mjs}",
                exclude: [],
                externalHelpers: false,
                externalHelpersWhitelist: [
                    "createClass",
                    "classCallCheck",
                    "inherits",
                    "possibleConstructorReturn",
                    "typeof",
                ],
                presets: [
                    [
                        "env",
                        {
                            modules: false,
                            targets: { browsers: ["ie 11"] },
                            useBuiltIns: true,
                        },
                    ],
                ],
                plugins: [
                    "external-helpers",
                ],
            }),
            minify({
                comments: false,
                banner,
                sourceMap: true,
            }),
        ],
    })
    await bundle.write({
        file: "dist/abort-controller.umd.js",
        sourcemapFile: "dist/abort-controller.umd.js.map",
        sourcemap: true,
        format: "umd",
        name: "AbortControllerShim",
        outro,
    })
})().catch(error => {
    console.error(error)
    process.exitCode = 1
})
