import baseConfig from "eslint-config-custom";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  ...baseConfig,

  {
    files: ["src/**/*.{mjs,cjs,js,jsx,ts,tsx}"]
  },

  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname
      }
    }
  }
];
