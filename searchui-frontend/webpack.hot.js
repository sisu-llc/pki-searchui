const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    // lazy: true,
    overlay: true,
    filename: 'main.js',
    publicPath: '/pki-searchui/',
    // contentBase: path.join(__dirname, 'src'),
    port: 9000,
    //hot: true,
    historyApiFallback: {
      index: '/pki-searchui/',
    },
    // NOTE: make sure you bump the number of allowed file descriptors to ~4096!!!
    proxy: [{
      context: [
        '/pki-searchui/users',
        '/pki-searchui/configuration',
        '/pki-searchui/rest',
      ],
      target: 'http://127.0.0.1:8080', // this should be our spring-boot servlet
      changeOrigin: true,
    }],
  },
});
