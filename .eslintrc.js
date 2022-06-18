module.exports = {
  env: {
    commonjs: true,
    es6: true,
  },
  extends: ["eslint:recommended", "prettier", "react-app"],
  plugins: ["prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "prettier/prettier": ["error", { tabWidth: 2, useTabs: false }],
    "require-await": ["error"],
  },
};
