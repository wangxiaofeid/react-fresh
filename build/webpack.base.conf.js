const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const config = require('../config')
const utils = require('./utils')
const devMode = process.env.NODE_ENV !== 'production'

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  plugins: [new webpack.DllReferencePlugin({
      context : __dirname,
      manifest: path.resolve(__dirname, '../dist/dll', 'manifest.json')
    }),
    new ExtractTextPlugin({
      filename: (getPath) => {
        return getPath('css/style.css').replace('css/js', 'css');
      }
    }),
    new OptimizeCSSAssetsPlugin({})
  ],
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
  // optimization: {
  //   sideEffects: false,
  //   splitChunks: {
  //     chunks     :'async',
  //     minSize    : 30000,
  //     minChunks  : 1,
  //     cacheGroups: {
  //       common: {
  //         name    : 'common',
  //         test    : /node_modules/,
  //         chunks  : 'initial',
  //         priority: -10,
  //         enforce : true
  //       },
  //       styles: {
  //         name   : 'styles',
  //         test   : /(\.less|\.css)$/,
  //         chunks : 'all',
  //         enforce: true,
  //       }
  //     }
  //   }
  // },
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
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
