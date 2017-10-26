'use strict';
const path = require('path');
const express = require('express');

const __DEV__ = process.env.NODE_ENV!='production';

const app = (()=>{
    const ewrap = f=>{
        if (f.length>3)
            return f;
        return (...args)=>{
            try {
                let ret = f(...args);
                if (ret && typeof ret.catch=='function')
                    ret.catch(args[args.length-1]);
            } catch(err) { args[args.length-1](err); }
        };
    };
    let app = express();
    for (let fn of ['use', 'all', 'get', 'post', 'put', 'delete', 'head', 'options'])
    {
        let orig = app[fn].bind(app);
        app[fn] = (...args)=>orig(...args.map(arg=>typeof arg=='function' ? ewrap(arg) : arg));
    }
    return app;
})();
app.use(express.static(path.resolve(__dirname, './dist'), {index: false}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
if (__DEV__)
{
    require('longjohn');
    app.use(require('morgan')('dev'));
    app.use((req, res, next)=>{
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        req.body && Object.keys(req.body).length && console.log(req.body);
        next();
    });
}

if (__DEV__)
{
    let webpack = require('webpack');
    let config = require('./webpack.config.js');
    let compiler = webpack(config);
    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        publicPath: '/',
        historyApiFallback: true,
        hot: true,
    }));
    app.use(require('webpack-hot-middleware')(compiler));
    app.use('*', (req, res, next)=>{
        compiler.outputFileSystem.readFile(path.join(compiler.outputPath,'index.html'), (err, result)=>{
            if (err)
                return next(err);
            res.set('content-type','text/html');
            res.send(result);
            res.end();
        });
    });
}
else
    app.get('*', (req, res)=>res.sendFile(path.resolve(__dirname, './dist/index.html')));

app.listen(process.env.PORT||3000, function(err){
    if (err)
        return console.log(err);
    console.log(`listening on port ${this.address().port}`);
});

