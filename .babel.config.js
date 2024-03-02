// Docs: https://babeljs.io/docs/en/config-files
/** @type {import("babel").Config} */
export default {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
    "@babel/preset-typescript",
  ],
  plugins: [
    "@babel/plugin-transform-class-properties",
    "@babel/plugin-transform-object-rest-spread",
    "@babel/plugin-transform-runtime",
  ],
};
