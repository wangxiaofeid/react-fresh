const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('../config');
const utils = require('./utils');
const devMode = process.env.NODE_ENV !== 'production';

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    cache: true,
    context: path.resolve(__dirname, '../'),
    entry: {
        app: './src/main.js',
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: path.resolve(__dirname, devMode ? '../static/dll-dev' : '../dist/dll', 'manifest.json'),
        }),
    ],
    output: {
        path: config.build.assetsRoot,
        filename: 'js/[name].js',
        publicPath: devMode ? config.dev.assetsPublicPath : config.build.assetsPublicPath,
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            '@': resolve('src'),
        },
    },
    externals: {},
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader?cacheDirectory=true',
                },
            },
            {
                test: /\.css$/,
                use: [devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.less$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            modules: false,
                            javascriptEnabled: true,
                            modifyVars: {
                                hack: `true; @import "~@/styles/theme.less";`,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: devMode
                        ? utils.assetsPath('img/[name].[ext]')
                        : utils.assetsPath('img/[name].[hash:7].[ext]'),
                },
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: devMode
                        ? utils.assetsPath('media/[name].[ext]')
                        : utils.assetsPath('media/[name].[hash:7].[ext]'),
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: devMode
                        ? utils.assetsPath('fonts/[name].[ext]')
                        : utils.assetsPath('fonts/[name].[hash:7].[ext]'),
                },
            },
        ],
    },
};
