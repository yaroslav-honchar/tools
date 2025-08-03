import configPrettier from "eslint-config-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tsEslint from "typescript-eslint";

import pluginJs from "@eslint/js";

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    ignores: ["dist/*", "node_modules/*", "*.config.{js,mjs,ts}"],
  },

  // Common js/ts configuration
  pluginJs.configs.recommended,
  ...tsEslint.configs.recommended,

  // Prettier configuration
  configPrettier,

  // Custom rules
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": [
        "warn", {
          groups: [
            ["^../"],
            ["^./"],
          ],
        },
      ],
      "simple-import-sort/exports": "warn",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-empty-function": "off",
      "no-unused-vars": "off",
      "no-dupe-keys": "warn",
      "no-dupe-args": "warn",
      semi: ["warn"],
      quotes: ["warn", "double"],
      "@typescript-eslint/no-empty-interface": [
        "warn", {
          allowSingleExtends: true,
        },
      ],
      indent: [
        "error", 2, {
          SwitchCase: 1,
        },
      ],
      "linebreak-style": ["error", "unix"],
      "max-len": ["error", {
        code: 140,
      }],
    },
  },
];
