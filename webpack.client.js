const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const webpackNodeExternals = require('webpack-node-externals');
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');

const isProductionEnv = process.env.NODE_ENV == 'production';

const config = {

  // root file for application
  entry: './src/client/client.js',

  devtool: isProductionEnv ? 'none' : 'source-map',

  // output of bundled file
  // output the file in public folder, so that browser can access the file
  output: {
    filename: '[name]_[chunkhash].js',
    chunkFilename: '[id].[chunkhash].js',
    path: path.resolve(__dirname, 'public')
  },

  plugins: isProductionEnv ? [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }),
    new CompressionPlugin({
      algorithm: 'gzip',
      asset: 'client_bundle_[hash].gz'
    })
  ] : [
      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      }),
      new BrotliPlugin({
        asset: '[path].br[query]',
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      })
    ]
};


module.exports = merge(baseConfig, config);