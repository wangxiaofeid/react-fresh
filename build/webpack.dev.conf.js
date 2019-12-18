const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const apiMocker = require('mocker-api');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');
const config = require('../config');

const { MOCK } = process.env;

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    cache: true,
    output: {
        chunkFilename: 'js/[name].js',
    },
    devServer: {
        inline: true,
        host: config.dev.host,
        port: config.dev.port,
        contentBase: [path.join(__dirname, '../dist'), path.join(__dirname, '../static')],
        open: config.dev.autoOpenBrowser,
        hot: true,
        historyApiFallback: true,
        disableHostCheck: true,
        host: '0.0.0.0',
        headers: { 'Access-Control-Allow-Origin': '*' },
        proxy: MOCK ? {} : config.dev.proxyTable || {},
        before(app) {
            MOCK && apiMocker(app, path.resolve('./mocker/index.js'));
        },
    },
    devtool: config.dev.devtool,
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            dllPath: '/dll-dev',
        }),
    ],
    optimization: {
        minimize: false,
    },
});
