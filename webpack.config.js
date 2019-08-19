const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const NODE_ENV = (process.env.NODE_ENV == 'development' && process.env.NODE_ENV) || 'production';

module.exports = {
    mode: NODE_ENV,
    entry: ['./src/index.jsx'],
    devtool: {development: 'inline-source-map'}[NODE_ENV],
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        ...{
            development: {filename: 'bundle.js'},
            production: {filename: '[name].[chunkhash].js'},
        }[NODE_ENV],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader'],
                include: path.join(__dirname, 'src'),
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
            },
            {
                test: /\.(sass|scss)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(jpe?g|png|gif|woff2?|eot|ttf|svg)$/,
                use: 'file-loader?limit=10000',
            },
        ],
    },
    plugins: [
        new (require('dotenv-webpack'))({
            path: `./.env.${NODE_ENV}`,
        }),
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: JSON.stringify(NODE_ENV)},
            __DEV__: NODE_ENV == 'development',
        }),
        new (require('html-webpack-plugin'))({
            inject: false,
            template: require('html-webpack-template'),
            title: require('./package.json').name,
            appMountId: 'root',
            mobile: true,
            favicon: path.resolve(__dirname, './static/favicon.ico'),
            minify: {collapseWhitespace: true},
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css',
        }),
        new webpack.ProvidePlugin({
            React: 'react',
        }),
        ...{
            development: [
                new webpack.NamedModulesPlugin(),
                new webpack.HotModuleReplacementPlugin(),
                new webpack.NoEmitOnErrorsPlugin(),
            ],
            production: [
                new (require('terser-webpack-plugin'))({
                    parallel: true,
                    terserOptions: {
                        ecma: 6,
                    },
                }),
            ],
        }[NODE_ENV],
    ],
    resolve: {
        modules: [path.resolve('./src'), 'node_modules'],
        extensions: ['.js', '.jsx', '.css', '.less', '.sass', '.scss'],
    },
    devServer: {
        port: 3000,
        hot: true,
        open: true,
        historyApiFallback: true,
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /\/node_modules\/(react|react-dom|react-router-dom)\//,
                    name: 'vendor',
                    chunks: 'all',
                },
            },
        },
    },
};
