const path = require('path')
const webpack = require('webpack')
const config = require('../config')
const utils = require('./utils');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: 'js/[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': resolve('src'),
    }
  },
  optimization: {
    sideEffects: false,
    splitChunks: {
      chunks     :'async',
      minSize    : 30000,
      minChunks  : 1,
      cacheGroups: {
        common: {
          name    : 'common',
          test    : /node_modules/,
          chunks  : 'initial',
          priority: -10,
          enforce : true
        },
        styles: {
          name   : 'styles',
          test   : /(\.less|\.css)$/,
          chunks : 'all',
          enforce: true,
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [{ 
          loader: 'style-loader' 
        }, { 
          loader: 'css-loader' 
        }]
      },
      {
        test: /\.less$/,
        use: [{ 
          loader: 'style-loader' 
        }, { 
          loader: 'css-loader' 
        }, { 
          loader: 'less-loader' 
        }]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
