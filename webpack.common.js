const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");

module.exports = {
  entry: {
    index: ["babel-polyfill", path.join(__dirname, "/src/index.ts")],
    cost: ["babel-polyfill", path.join(__dirname, "/src/cost.ts")],
    geo: ["babel-polyfill", path.join(__dirname, "/src/geo.ts")]
  },
  output: {
    path: __dirname,
    // filename: path.join(__dirname, "dst", "[name]-[hash]-bundle.js")
    filename: "dst/[name]-[hash]-bundle.js"
  },
  resolve: {
    extensions: [".ts", ".js", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/cost.ejs",
      inject: true,
      chunks: ['cost'],
      filename: "cost/index.html",
    }),
    new HtmlWebpackPlugin({
      template: "src/geo.ejs",
      inject: true,
      chunks: ['geo'],
      filename: "geo/index.html",
    }),
    new HtmlWebpackPlugin({
      template: "src/index.ejs",
      inject: true,
      chunks: ['index'],
      filename: "index.html",
    }),
    new SWPrecacheWebpackPlugin({
      minify: true,
      cacheId: "jojo.jy.is",
      filename: "service-worker.js",
      mergeStaticsConfig: true,
      staticFileGlobs: ["images/*"],
    })
  ]
};
