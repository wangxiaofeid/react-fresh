const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const config = require('../config')

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  output: {
    chunkFilename: 'js/[name].[chunkhash:8].js',
  },
  // plugins: []
});