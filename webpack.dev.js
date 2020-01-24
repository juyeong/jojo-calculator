const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require("webpack");

process.env.NODE_ENV = "development";

module.exports = merge(common, {
  mode: "development",
  // devtool: "inline-source-map",
  devServer: {
    contentBase: __dirname,
    compress: true,
    host: '0.0.0.0',
    hot: true,
    allowedHosts: ["localhost", "lvh.me"]
  },
  optimization: {
    occurrenceOrder: false,
    minimize: false,
    noEmitOnErrors: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
});
