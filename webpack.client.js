const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const webpackNodeExternals = require('webpack-node-externals');
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isProductionEnv = process.env.NODE_ENV == 'production';

const config = {

  // root file for application
  entry: ['./src/client/client.js', './src/client/style/main.scss'],

  devtool: isProductionEnv ? 'none' : 'source-map',

  // output of bundled file
  // output the file in public folder, so that browser can access the file
  output: {
    filename: '[name]_[chunkhash].js',
    chunkFilename: '[id].[chunkhash].js',
    path: path.resolve(__dirname, 'public')
  },

  module: {
    rules: [
      { // sass / scss loader for webpack
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader', options: {
                importLoaders: 1,
                minimize: true,
                sourceMap: true
              }
            },
            { loader: 'sass-loader' },
            'postcss-loader'
          ]
        })
      }
    ],
  },

  plugins: isProductionEnv ? [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    }),
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
    }),
    new ExtractTextPlugin({ 
      filename: '[name]_[chunkhash].css',
      allChunks: true,
    })
  ] : [
      new ExtractTextPlugin({ 
        filename: '[name]_[chunkhash].css',
        allChunks: true,
      })
    ]
};


module.exports = merge(baseConfig, config);