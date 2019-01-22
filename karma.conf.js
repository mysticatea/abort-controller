"use strict"

const babel = require("rollup-plugin-babel")
const commonjs = require("rollup-plugin-commonjs")
// const json = require("rollup-plugin-json")
const resolve = require("rollup-plugin-node-resolve")
const sourcemaps = require("rollup-plugin-sourcemaps")
const typescript = require("rollup-plugin-typescript")

module.exports = function(config) {
    config.set({
        browsers: ["Chrome", "Firefox", "IE"],
        files: ["test/index.ts", "test/polyfill.ts"],
        frameworks: ["mocha"],
        mime: {
            "text/javascript": ["ts"],
        },
        reporters: ["progress", "growl"],
        preprocessors: {
            "test/*.ts": ["rollup"],
        },
        rollupPreprocessor: {
            output: {
                format: "iife",
                name: "AbortControllerShim",
                sourcemap: "inline",
            },
            plugins: [
                resolve({ browser: true, preferBuiltins: false }),
                sourcemaps(),
                commonjs(),
                typescript({ module: "es2015" }),
                babel({
                    babelrc: false,
                    extensions: [".js", ".mjs", ".ts"],
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
            ],
        },
    })
}
