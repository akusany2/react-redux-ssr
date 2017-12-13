const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const webpackNodeExternals = require('webpack-node-externals');


const config = {
  // bundling for nodejs rather than browser
  target: 'node',

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