const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const {name} = require('./package.json');

const NODE_ENV = process.env.NODE_ENV=='development' && process.env.NODE_ENV || 'production';

module.exports = require('webpack-merge')({
    entry: ['babel-polyfill'],
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loaders: ['babel-loader', 'eslint-loader'],
            include: path.join(__dirname, 'src'),
        }, {
            test: /\.(less|css)$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'less-loader'],
            }),
        }, {
            test: /\.json$/,
            loader: 'json-loader',
        }, {
            test: /\.(jpe?g|png|gif|woff2?|eot|ttf|svg)$/,
            loader: 'file-loader?limit=10000',
        }],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: JSON.stringify(NODE_ENV)},
            __DEV__: NODE_ENV=='development',
        }),
        new (require('html-webpack-plugin'))({
            inject: false,
            template: require('html-webpack-template'),
            title: name,
            appMountId: 'root',
            minify: {collapseWhitespace: true},
        }),
        new ExtractTextPlugin({
            filename: '[name].[contenthash].css',
            disable: NODE_ENV=='development',
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.less'],
    },
}, {
    development: {
        entry: [
            'react-hot-loader/patch',
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        ],
        devtool: 'inline-source-map',
        output: {
            filename: 'bundle.js',
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
        ],
    },
    production: {
        output: {
            filename: '[name].[chunkhash].js',
        },
        plugins: [
            new UglifyJsPlugin({
                uglifyOptions: {
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
                },
            }),
        ],
    },
}[NODE_ENV], {
    entry: ['./src/index.jsx'],
});
