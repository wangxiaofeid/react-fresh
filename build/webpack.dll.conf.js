const path = require('path');
const webpack = require('webpack');
const devMode = process.env.NODE_ENV == 'development';
const outpath = devMode ? '../static/dll-dev' : '../dist/dll';
const dllConfig = {
    mode: process.env.NODE_ENV,
    entry: {
        vendor: ['react', 'react-dom', 'react-router', 'react-router-dom', 'mobx', 'mobx-react', 'react-loadable'],
    },
    output: {
        path: path.resolve(__dirname, outpath),
        filename: '[name].js',
        library: '[name]_library',
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]_library',
            path: path.resolve(__dirname, outpath, 'manifest.json'),
            context: __dirname,
        }),
    ],
    devtool: devMode ? 'eval-source-map' : false,
};

webpack(dllConfig).run();
