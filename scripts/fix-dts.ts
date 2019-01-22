import fs from "fs"

fs.writeFileSync(
    "dist/abort-controller.d.ts",
    [
        fs
            .readFileSync("dist/abort-controller.d.ts", "utf8")
            .replace(/export declare type/gu, "type")
            .replace(/export (?:declare|default) class/gu, "declare class")
            .replace(/\t/gu, "    ")
            .replace(/'/gu, '"')
            .replace(/;\n/gu, "\n"),
        "",
        "export default AbortController",
        "export { AbortController, AbortSignal }",
        "",
    ].join("\n"),
)
