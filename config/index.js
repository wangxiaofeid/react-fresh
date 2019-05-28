const path = require('path');

module.exports = {
    dev: {
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/api/*': {
                target: 'http://rap2api.taobao.org/app/mock/19489',
                changeOrigin: true,
                secure: false,
            },
        },
        port: 8083, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: false,
        devtool: 'eval-source-map',
    },
    build: {
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        devtool: 'source-map',
    },
};
