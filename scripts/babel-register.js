require("babel-register")({
    babelrc: false,
    extensions: [".mjs"],
    presets: [
        ["env", { "targets": { "node": "4" } }]
    ],
    sourceMaps: "inline",
})
