import baseConfig from "eslint-config-custom";
import pluginReact from "eslint-plugin-react";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  ...baseConfig,

  // React configuration
  pluginReact.configs.flat.recommended, {
    settings: {
      react: {
        version: "detect"
      }
    }
  },
  {
    rules: {
      "simple-import-sort/imports": [
        "warn", {
          groups: [
            ["^../"],
            ["^./"]
          ]
        }
      ],
      "react-hooks/exhaustive-deps": "off"
    }
  }
];
