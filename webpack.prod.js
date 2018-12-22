const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  mode: "production",
  optimization: {
    occurrenceOrder: true,
    minimize: true,
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: "src/static", to: "" },
    ])
  ]
});
