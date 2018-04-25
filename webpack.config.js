const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './test/index.js',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'public', 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2017', 'react'],
            cacheDirectory: true
          } 
        }
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin()
  ]
}