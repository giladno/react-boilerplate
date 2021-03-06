# react-boilerplate

So far I couldn't find any react boilerplate I was happy with, so decided to prepare one myself.

It was hand-crafted and should be good enough for any small/medium project.

**NOTE: This is an opinionated boilerplate based on my own preferences, but feel free to suggest ideas!**

It doesn't contain any state management library simply because not all projects require it, but it's pretty easy to add [MobX](https://mobx.js.org/) to it. My first projects were based on [Redux](http://redux.js.org/) but personally I think there is too much hype around it and eventually it makes your codebase much larger and complex. Please give [MobX](https://mobx.js.org/) a try instead :)

## What's included

-   [parcel](https://parceljs.org/) bundler
-   [normalize.css](https://necolas.github.io/normalize.css/)
-   [react-router](https://reacttraining.com/react-router/)
-   [ESLint](http://eslint.org/) rules
-   HMR
-   <del>A single [webpack](https://webpack.github.io/) script</del>
-   <del>[mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) and [terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin) in production</del>
-   <del>Images/[CSS](https://github.com/webpack-contrib/css-loader)/[Less](https://github.com/webpack-contrib/less-loader)/[Sass](https://github.com/webpack-contrib/sass-loader) loaders</del>
-   <del>Automatically generate HTML index file using [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)</del>
-   <del>[styled-jsx](https://github.com/zeit/styled-jsx)</del>
-   <del>[DotEnv](https://github.com/mrsteele/dotenv-webpack) plugin</del>
-   <del>[Code-Splitting](https://reactjs.org/docs/code-splitting.html)</del>

## License

MIT
