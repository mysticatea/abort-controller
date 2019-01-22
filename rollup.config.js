import babel from "rollup-plugin-babel"
import minify from "rollup-plugin-babel-minify"
import resolve from "rollup-plugin-node-resolve"
import typescript from "rollup-plugin-typescript"

const banner = `/**
 * @author Toru Nagashima <https://github.com/mysticatea>
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
        input: "src/abort-controller.ts",
        output: {
            banner,
            file: "dist/abort-controller.mjs",
            format: "es",
            sourcemap: true,
        },
        plugins: [typescript({ module: "es2015" })],
    },
    {
        external: ["event-target-shim"],
        input: "src/abort-controller.ts",
        output: {
            banner,
            file: "dist/abort-controller.js",
            format: "cjs",
            outro: cjsOutro,
            sourcemap: true,
        },
        plugins: [typescript({ module: "es2015" })],
    },
    {
        input: "src/abort-controller.ts",
        output: {
            file: "dist/abort-controller.umd.js",
            format: "umd",
            name: "AbortControllerShim",
            outro: umdOutro,
            sourcemap: true,
        },
        plugins: [
            resolve(),
            typescript({ module: "es2015" }),
            babel({
                babelrc: false,
                extensions: [".mjs", ".ts"],
                include: ["**/*.mjs", "**/*.ts"],
                presets: [
                    [
                        "@babel/env",
                        {
                            modules: false,
                            targets: { ie: "11" },
                        },
                    ],
                ],
                sourceMaps: true,
            }),
            minify({
                comments: false,
                banner,
                sourceMap: true,
            }),
        ],
    },
]
