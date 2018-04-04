const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  // An array of files to run at startup...
  mode: 'production',
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: { test: /[\\/]node_modules[\\/]/, name: 'vendors', chunks: 'all' },
      },
    },
  },
  output: { filename: '[name].min.js' },
  devtool: 'source-map',
});
