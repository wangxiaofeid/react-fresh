const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')
const config = require('../config')

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  output: {
    chunkFilename: 'js/[name].[chunkhash:8].js',
  },
  plugins: [
    new CleanWebpackPlugin('*', {
      root:     path.resolve(__dirname, '../dist'),
      verbose:  true,
      dry:      false
    }),
  ]
});