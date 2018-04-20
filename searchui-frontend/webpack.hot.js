const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    publicPath: '/pki-searchui',
    contentBase: common.output.path,
    port: 9000,
    host: '127.0.0.1',

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
