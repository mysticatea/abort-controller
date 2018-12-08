"use strict"

require("@babel/register")({
    babelrc: false,
    extensions: [".js", ".mjs"],
    plugins: ["@babel/plugin-transform-modules-commonjs"],
})
