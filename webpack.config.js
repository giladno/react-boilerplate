const path = require('path');
const webpack = require('webpack');
const {name} = require('./package.json');

const NODE_ENV = process.env.NODE_ENV=='development' && process.env.NODE_ENV || 'production';

module.exports = require('webpack-merge')({
    entry: ['babel-polyfill'],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loaders: ['babel-loader'],
            include: path.join(__dirname, 'src'),
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        }, {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader'],
        }, {
            test: /\.(jpe?g|png|woff|woff2|eot|ttf|svg)$/,
            loader: 'url-loader?limit=100000',
        }],
    },
    plugins: [
        new (require('html-webpack-plugin'))({
            inject: false,
            template: require('html-webpack-template'),
            title: name,
            appMountId: 'root',
            minify: {collapseWhitespace: true},
        }),
    ],
}, {
    development: {
        entry: ['webpack-dev-server/client?http://localhost:3000'],
        devtool: 'cheap-module-eval-source-map',
        output: {
            publicPath: '/build/',
        },
    },
    production: {
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                comments: false,
                compress: {
                    warnings: false,
                    dead_code: true,
                    properties: true,
                    conditionals: true,
                    booleans: true,
                    loops: true,
                    unused: true,
                    if_return: true,
                    negate_iife: true,
                    drop_console: true,
                    passes: 2,
                },
            }),
        ],
    },
}[NODE_ENV], {
    entry: ['./src/app.jsx'],
});
