const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const webpackNodeExternals = require('webpack-node-externals');

const isProductionEnv = process.env.NODE_ENV == 'production';

const config = {

  // root file for application
  entry: './src/client/client.js',

  devtool: isProductionEnv ? 'none' : 'source-map',

  // output of bundled file
  // output the file in public folder, so that browser can access the file
  output: {
    filename: 'client_bundle.js',
    path: path.resolve(__dirname, 'public')
  },

  plugins: isProductionEnv ? [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    })
  ] : []
};


module.exports = merge(baseConfig, config);