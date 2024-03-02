// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/** @type {import("prettier").Config} */
const config = {
  printWidth: 120,
  quoteProps: "as-needed",
  trailingComma: "es5",
  tabWidth: 2,
  semi: true,
  bracketSameLine: false,
  arrowParens: "always",
  endOfLine: "lf",
  jsxSingleQuote: false,
  proseWrap: "preserve",
  parser: "babel",
  bracketSpacing: false,
};

export default config;
