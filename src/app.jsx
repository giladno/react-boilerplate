require('normalize.css');
require('./css/style.less');
import React, {PureComponent} from 'react';
import {Route} from 'react-router-dom';

const App = ()=><h1>Hello, world</h1>;

export default class extends PureComponent {
    render(){
        return (
            <Route>
                <Route exact path='/' component={App} />
            </Route>
        );
    }
}
