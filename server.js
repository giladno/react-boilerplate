'use strict';
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath
}).listen(3000, err=>{
    if (err)
        console.log(err);
    console.log('Running at http://localhost:3000');
});
