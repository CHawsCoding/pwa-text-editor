const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.

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
  icons: [
    {
      src: path.resolve("src/assets/icon.png"),
      sizes: [96, 128, 192, 256, 384, 512],
      destination: path.join("icons"),
    },
  ],
});

// TODO: Add CSS loaders and babel to webpack.

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
        template: "./src/index.html",
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
