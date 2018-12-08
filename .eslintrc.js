/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const { configs, utils } = require("@mysticatea/eslint-plugin")

module.exports = {
    root: true,
    extends: ["plugin:@mysticatea/es2015"],
    rules: {
        "import/exports-last": "off",
        "import/first": "off",

        // To reduce size for babel-translation.
        "no-restricted-syntax": [
            "error",
            "ForOfStatement",
            "BinaryExpression[left.operator='typeof'][right.value='object']",
        ],
        "prefer-rest-params": "off",
        "prefer-spread": "off",
        "@mysticatea/prefer-for-of": "off",
    },
    overrides: [
        utils.merge({ files: "*.mjs" }, configs["+modules"]),
        {
            files: "test/*.mjs",
            rules: {
                "new-cap": "off",
            },
        },
    ],
}
