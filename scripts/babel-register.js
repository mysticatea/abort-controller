require("babel-register")({
    babelrc: false,
    extensions: [".mjs"],
    ignore: false,
    presets: [
        ["env", { "targets": { "node": "4" } }]
    ],
    sourceMaps: "inline",
})
