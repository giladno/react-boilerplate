import 'core-js/stable';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import 'regenerator-runtime/runtime';

const render = () => {
    const {App} = require('./app.jsx');
    ReactDOM.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>,
        document.getElementById('root')
    );
};
render();
if (module.hot) module.hot.accept('./app.jsx', render);
