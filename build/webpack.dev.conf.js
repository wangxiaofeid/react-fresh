const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const config = require('../config')

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  output: {
    chunkFilename: 'js/[name].js',
  },
  devServer: {
    inline:true,
    port: config.dev.port
  },
  devtool: 'eval-source-map',
  // plugins: []
});