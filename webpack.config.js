var path = require('path');
var webpack = require('webpack');
var parseArgs = require('minimist');

var argv = parseArgs(process.argv.slice(2));

module.exports = {
  entry: {
    javascript: './index'
  },

  output: {
    filename: './dist/application.js'
  },

  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel-loader']
      }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': argv.env === 'development' ?
            JSON.stringify('development') :
            JSON.stringify('production')
      }
    })
  ]
};
