const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

const workboxPlugin = new InjectManifest({
  swSrc: "./src-sw.js",
  swDest: "sw.js",
});

const manifestPlugin = new WebpackPwaManifest({
  name: "PWA Text Editor",
  short_name: "PWATextEditor",
  description: "A PWA Text Editor that works offline!",
  background_color: "#ffffff",
  theme_color: "#333333",
  display: "standalone",
  publicPath: "/",
  filename: "[name].[ext]",
  fingerprints: false, 
  icons: [
    {
      src: path.resolve("src/images/logo.png"),
      sizes: [96, 128, 192, 256, 384, 512],
      destination: path.join("icons"),
    },
  ],
});

const babelRule = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-env"],
    },
  },
};

const cssRule = {
  test: /\.css$/,
  use: ["style-loader", "css-loader"],
};

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        filename: "index.html",
      }),
      workboxPlugin,
      manifestPlugin,
    ],
    module: {
      rules: [babelRule, cssRule],
    },
  };
};
