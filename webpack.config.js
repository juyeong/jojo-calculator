const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

module.exports = {
  entry: {
    index: ["babel-polyfill", path.join(__dirname, "/src/index.ts")],
    cost: ["babel-polyfill", path.join(__dirname, "/src/cost.ts")],
    geo: ["babel-polyfill", path.join(__dirname, "/src/geo.ts")]
  },
  output: {
    path: path.resolve(__dirname, 'dst'),
    filename: "[name]-[hash]-bundle.js"
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader"
      }
    ]
  },
  devServer: {
    contentBase: __dirname,
    compress: true,
    host: "0.0.0.0",
    hot: true,
    allowedHosts: ["localhost", "lvh.me"]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: "src/cost.ejs",
      inject: true,
      chunks: ['cost'],
      filename: path.join(__dirname, "cost/index.html"),
    }),
    new HtmlWebpackPlugin({
      template: "src/geo.ejs",
      inject: true,
      chunks: ['geo'],
      filename: path.join(__dirname, "geo/index.html"),
    }),
    new HtmlWebpackPlugin({
      template: "src/index.ejs",
      inject: true,
      chunks: ['index'],
      filename: path.join(__dirname, "index.html"),
    }),
    new SWPrecacheWebpackPlugin({
      minify: true,
      cacheId: 'jojo.jy.is',
      filename: 'service-worker.js',
      staticFileGlobsIgnorePatterns: [/.*\.html$/]
    })
  ]
};
