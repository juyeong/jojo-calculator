const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const RobotsTxtPlugin = require("robotstxt-webpack-plugin");
const SitemapPlugin = require("sitemap-webpack-plugin").default;
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;

const HOSTNAME = "https://jojo.jy.is";

module.exports = {
  context: __dirname,
  entry: {
    index: ["babel-polyfill", path.join(__dirname, "/src/main/index.ts")],
    cost: ["babel-polyfill", path.join(__dirname, "/src/cost/index.ts")],
    geo: ["babel-polyfill", path.join(__dirname, "/src/geo/index.ts")],
    mongme: ["babel-polyfill", path.join(__dirname, "/src/mongme/index.ts")]
  },
  output: {
    path: path.join(__dirname, "dst"),
    publicPath: "/",
    filename: () => {
      if (process.env.NODE_ENV === "development") {
        return "js/[name].js";
      } else {
        return "js/[contenthash].js";
      }
    }
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
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'images',
          esModule: false,
          name: '[name].[ext]?[contenthash]',
        }
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "mongme/index.html",
      template: "src/mongme/index.ejs",
      inject: true,
      chunks: ["mongme"],
    }),
    new HtmlWebpackPlugin({
      filename: "cost/index.html",
      template: "src/cost/index.ejs",
      inject: true,
      chunks: ["cost"],
    }),
    new HtmlWebpackPlugin({
      filename: "geo/index.html",
      template: "src/geo/index.ejs",
      inject: true,
      chunks: ["geo"],
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/main/index.ejs",
      inject: true,
      chunks: ["index"],
    }),
    new SWPrecacheWebpackPlugin({
      minify: true,
      cacheId: "jojo.jy.is",
      filename: "service-worker.js",
      mergeStaticsConfig: true,
      staticFileGlobsIgnorePatterns: [
        /CNAME$/,
        /sitemap\.xml(\.gz)?$/,
        /robots\.txt$/
      ],
    }),
    new RobotsTxtPlugin({
      policy: [{
        userAgent: "*",
        allow: "/"
      }],
      sitemap: `${HOSTNAME}/sitemap.xml`,
      host: HOSTNAME
    }),
    new SitemapPlugin(HOSTNAME, ["/", "/cost/", "/geo/", "/mongme/"], {
      lastMod: true,
      changeFreq: "monthly",
      priority: "0.8"
    }),
  ]
};
