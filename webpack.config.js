const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    'webpack-hot-middleware/client?reload=true',
    './client/index.js',
  ],
  output: {
    path: path.resolve(__dirname, 'client'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
}
