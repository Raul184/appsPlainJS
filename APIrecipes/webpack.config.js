const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin"); //It'll print file to server, NOT create it


module.exports = {
      entry: {
            main: ['@babel/polyfill','./src/js/index.js']
      },
      mode: 'development',
      output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist')
      },
      devServer: {
            contentBase: './dist/'
      },
      plugins: [
            new HtmlWebpackPlugin({
                  filename: "index.html",
                  template: "./src/index.html"
            })
      ],
      module: {
            rules: [{
                  test: /\.js$/,
                  exclude: /node_modules/,
                  use: {
                        loader: 'babel-loader',
                  }
            }]
      },
};