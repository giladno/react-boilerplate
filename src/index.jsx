import {AppContainer} from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './app.jsx';

const render = ()=>ReactDOM.render(
    <AppContainer>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </AppContainer>, document.getElementById('root'));

render();
if (module.hot)
    module.hot.accept('./app.jsx', render);
