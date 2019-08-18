require('normalize.css');
require('./css/style.less');
import React from 'react';
import {Route} from 'react-router-dom';

const Main = React.lazy(() => import('./main'));

export class App extends React.Component {
    render() {
        return (
            <React.Suspense fallback={<div>Loading...</div>}>
                <Route>
                    <Route exact path="/" component={Main} />
                </Route>
            </React.Suspense>
        );
    }
}
