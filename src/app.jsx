require('normalize.css');
require('./css/style.less');
import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

const App = ()=><h1>Hello, world</h1>;

export default class extends Component {
    render(){
        return (
            <BrowserRouter>
                <div>
                    <Route path='/' exact component={App} / >
                </div>
            </BrowserRouter>
        );
    }
}
