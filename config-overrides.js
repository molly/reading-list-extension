const { override, addWebpackPlugin } = require("customize-cra");
const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
  webpack: override(
    addWebpackPlugin(
      new CopyWebpackPlugin({
        patterns: [{ from: "src/scripts", to: "scripts" }],
      })
    )
  ),
};
