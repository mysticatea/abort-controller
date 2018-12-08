import babel from "rollup-plugin-babel"
import minify from "rollup-plugin-babel-minify"
import resolve from "rollup-plugin-node-resolve"

const banner = `/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */`
const cjsOutro = `module.exports = AbortController
module.exports.AbortController = module.exports["default"] = AbortController
module.exports.AbortSignal = AbortSignal
`
const umdOutro = `if (typeof module === "undefined" && typeof define === "undefined") {
    const global = Function("return this")()
    if (typeof global.AbortController === "undefined") {
        global.AbortController = AbortController
        global.AbortSignal = AbortSignal
    }
}
`

export default [
    {
        external: ["event-target-shim"],
        input: "src/abort-controller.mjs",
        output: {
            banner,
            file: "dist/abort-controller.mjs",
            format: "es",
            sourcemap: true,
            sourcemapFile: "dist/abort-controller.mjs.map",
        },
    },
    {
        external: ["event-target-shim"],
        input: "src/abort-controller.mjs",
        output: {
            banner,
            file: "dist/abort-controller.js",
            format: "cjs",
            outro: cjsOutro,
            sourcemap: true,
            sourcemapFile: "dist/abort-controller.js.map",
        },
    },
    {
        input: "src/abort-controller.mjs",
        output: {
            file: "dist/abort-controller.umd.js",
            format: "umd",
            name: "AbortControllerShim",
            outro: umdOutro,
            sourcemap: true,
            sourcemapFile: "dist/abort-controller.umd.js.map",
        },
        plugins: [
            resolve(),
            babel({
                babelrc: false,
                include: "**/*.{js,mjs}",
                exclude: [],
                presets: [
                    [
                        "@babel/env",
                        {
                            modules: false,
                            targets: { browsers: ["ie 11"] },
                        },
                    ],
                ],
            }),
            minify({
                comments: false,
                banner,
                sourceMap: true,
            }),
        ],
    },
]
