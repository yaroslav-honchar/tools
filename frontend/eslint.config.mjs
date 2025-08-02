import baseConfig from "eslint-config-custom";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  ...baseConfig,

  {
    files: ["src/**/*.{mjs,cjs,js,jsx,ts,tsx}"]
  },

  {
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
      ]
    }
  }
];
