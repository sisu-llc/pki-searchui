const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  output: { filename: '[name].js' },
  devtool: 'inline-source-map',
  devServer: { contentBase: './target/dist' },
});
