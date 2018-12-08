"use strict"

const babel = require("rollup-plugin-babel")
const commonjs = require("rollup-plugin-commonjs")
const json = require("rollup-plugin-json")
const resolve = require("rollup-plugin-node-resolve")

module.exports = function(config) {
    config.set({
        basePath: "..",
        frameworks: ["mocha"],
        files: ["test/*.mjs"],
        browsers: ["Chrome", "Firefox", "IE"],
        reporters: ["progress", "growl"],
        preprocessors: { "test/*.mjs": ["rollup"] },
        rollupPreprocessor: {
            plugins: [
                resolve(),
                commonjs(),
                json(),
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
            ],
            format: "iife",
            name: "AbortControllerShim",
            sourcemap: "inline",
        },
    })
}
