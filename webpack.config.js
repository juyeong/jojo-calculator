const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    cost: ["babel-polyfill", path.join(__dirname, "/src/cost.ts")],
    geo: ["babel-polyfill", path.join(__dirname, "/src/geo.ts")]
  },
  output: {
    path: __dirname + "/dst",
    filename: "[name]-bundle.js"
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
    contentBase: path.join(__dirname, "src"),
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
      filename: path.join(__dirname, "/cost/index.html")
    }),
    new HtmlWebpackPlugin({
      template: "src/geo.ejs",
      inject: true,
      chunks: ['geo'],
      filename: path.join(__dirname, "/geo/index.html")
    })
  ]
};
