const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const webpackNodeExternals = require('webpack-node-externals');

const isProductionEnv = process.env.NODE_ENV == 'production';

const config = {
  // bundling for nodejs rather than browser
  target: 'node',

  devtool: isProductionEnv ? none : 'source-map',

  // root file for application
  entry: './src/server.js',

  // output of bundled file
  output: {
    filename: 'server_bundle.js',
    path: path.resolve(__dirname, 'build')
  },

  // do not include node_modules plugins in the bundle
  externals: [webpackNodeExternals()]
};


module.exports = merge(baseConfig, config);