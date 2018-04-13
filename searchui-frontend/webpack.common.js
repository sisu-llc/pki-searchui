const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const EncodingPlugin = require('webpack-encoding-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


// This is the base URI for the webapp and is used when links get created for resources
// such as images and font files. It MUST match the value in the configuration.properties
// file.
const prefix = '/pki-searchui';
const publicPath = `${prefix}/`;
const outputPath = path.resolve(__dirname, 'target/dist');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: '[name].js',
    path: outputPath,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['env', 'stage-0', 'react'],
        },
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { publicPath } },
          { loader: 'less-loader', options: { publicPath } },
        ],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            publicPath,
            mimetype: 'application/font-woff',
          },
        }],
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{
          loader: 'file-loader',
          options: {
            publicPath,
          },
        }],
      },
      {
        test: /\.png$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 100000,
            publicPath,
          },
        }],
      },
      {
        test: /\.jpg$/,
        use: [{
          loader: 'file-loader',
          options: { publicPath },
        }],
      },
      {
        test: /\.svg$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'image/svg+xml',
            publicPath,
          },
        }],
      },
      {
        test: /\.xml$/,
        loader: 'xml-loader',
        options: {
          trim: true,
          explicitArray: false,
          explicitRoot: false,
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['target/dist']),
    new FaviconsWebpackPlugin({ logo: './src/favicon.png' }),
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      template: './src/index.template.ejs',
      inject: 'body',
      title: 'Attivio UI',
    }),
    new CopyWebpackPlugin([{ from: './src/img', to: 'img/' }]),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: ['style.css'],
      append: true,
    }),
    new EncodingPlugin({ encoding: 'utf-8' }),
  ],
};
