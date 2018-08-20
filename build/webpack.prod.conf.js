const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')
const config = require('../config')

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  output: {
    chunkFilename: 'js/[name].[chunkhash:8].js',
  },
  devtool: 'eval-source-map',
  plugins: [
    new CleanWebpackPlugin('*', {
      root:     path.resolve(__dirname, '../dist/js/'),
      verbose:  true,
      dry:      false
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../index.html')
    })
  ]
});