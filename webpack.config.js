const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const commonConfig = {
  entry: "./src/index.js",
  mode: "development",
};

const distConfig = {
  ...commonConfig,
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /107806435\.png$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "assets/[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/index.html", to: "index.html" },
        { from: "src/index.css", to: "index.css" },
        { from: "src/assets/107806435.png", to: "assets/107806435.png" },
      ],
    }),
  ],
};

const srcConfig = {
  ...commonConfig,
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "src"),
  },
};

module.exports = [distConfig, srcConfig];
