const path = require("path");

module.exports = {
  entry: "./index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /107806435\.png$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[ext]',
            }
          }
        ]
      }
    ]
  },
  plugins: [
      new CopyWebpackPlugin({
        patterns: [
        { from: "src/index.html", to: "dist/index.html" },
        { from: "src/index.css", to: "dist/index.css" },
        { from: "assets/107806435.png", to: "dist/assets/107806435.png" },
        { from: "bundle.js", to: "dist/bundle.js" },
        ],
      }),
    ],
};
