// config-overrides.js

const multipleEntry = require("react-app-rewire-multiple-entry")([
  {
    entry: "src/login.js",
    template: "public/login.html",
    outPath: "/login.html",
    omitHash: false,
  },
]);

module.exports = {
  webpack: function (config, env) {
    multipleEntry.addMultiEntry(config);
    return config;
  },
};
