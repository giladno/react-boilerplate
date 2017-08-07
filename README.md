# react-boilerplate
So far I couldn't find any react boilerplate I was happy with, so decided to prepare one myself.

It was hand-crafted and should be good enough for any small/medium project.

__NOTE: This is an opinionated boilerplate based on my own preferences, but feel free to suggest ideas!__

It doesn't contain any state management library simply because not all projects require it, but it's pretty easy to add [MobX](https://mobx.js.org/) to it. My first projects were based on [Redux](http://redux.js.org/) but personally I think there is too much hype around it and eventually it makes your codebase much larger and complex. Please give [MobX](https://mobx.js.org/) a try instead :)

## What's included
- A single [webpack](https://webpack.github.io/) script with shared, development and production parts
- [extract-text-webpack-plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin) in production to generate stamped css/js files
- Images loader
- CSS/Less support
- Automatically generate HTML index file using [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)
- Simple `node.js` server with hot loader support
- [ESLint](http://eslint.org/) rules
