"use strict"

const babel = require("rollup-plugin-babel")
const commonjs = require("rollup-plugin-commonjs")
const json = require("rollup-plugin-json")
const resolve = require("rollup-plugin-node-resolve")

module.exports = function(config) {
    config.set({
        basePath: "..",
        frameworks: ["mocha"],
        files: ["test/index.mjs"],
        browsers: ["Chrome", "Firefox", "IE"],
        reporters: ["progress", "growl"],
        preprocessors: { "test/index.mjs": ["rollup"] },
        rollupPreprocessor: {
            plugins: [
                resolve(),
                commonjs(),
                json(),
                babel({
                    babelrc: false,
                    presets: [
                        ["env", { modules: false, targets: { browsers: ["ie 11"] } }],
                    ],
                    externalHelpers: false,
                }),
            ],
            format: "iife",
            name: "AbortControllerShim",
            sourcemap: "inline",
        },
    })
}
