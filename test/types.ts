import path from "path"
import { TypeTester } from "type-tester"
import ts from "typescript"

const tester = new TypeTester(ts)

describe("TypeScript type definitions", () => {
    describe("'abort-controller.ts' should have no error even if it was compiled without 'lib.dom.d.ts'.", () => {
        tester.verify([path.resolve(__dirname, "../src/abort-controller.ts")], {
            lib: ["lib.es2015.d.ts"],
            moduleResolution: ts.ModuleResolutionKind.NodeJs,
            strict: true,
            target: ts.ScriptTarget.ES2015,
        })
    })

    tester.verify([path.resolve(__dirname, "fixtures/types.ts")], {
        lib: ["lib.es2015.d.ts", "lib.dom.d.ts"],
        moduleResolution: ts.ModuleResolutionKind.NodeJs,
        strict: true,
        target: ts.ScriptTarget.ES2015,
    })
})
