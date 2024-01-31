module.exports = {
  env: {
    commonjs: true,
    es6: true,
    webextensions: true
  },
  extends: ["eslint:recommended", "prettier", "react-app"],
  plugins: ["prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    "prettier/prettier": [
      "error",
      { tabWidth: 2, useTabs: false, trailingComma: "none" }
    ],
    "require-await": ["error"]
  },
  ignorePatterns: ["build/"]
};
