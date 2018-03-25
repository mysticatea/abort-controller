require("babel-register")({
    babelrc: false,
    extensions: [".mjs", ".js"],
    ignore: (file) => {
        return file.indexOf("/node_modules/") !== -1 && file.indexOf("/simple-spy/") === -1
    },
    presets: [
        ["env", { "targets": { "node": "4.0.0" } }]
    ],
    sourceMaps: "inline",
})
