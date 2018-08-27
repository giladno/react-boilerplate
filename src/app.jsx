require('normalize.css');
require('./css/style.less');
import {Route} from 'react-router-dom';

const Main = () => (
    <div>
        <h1>Hello, world</h1>
        <style jsx>{`
            div {
                text-align: center;
            }
        `}</style>
    </div>
);

export class App extends React.Component {
    render() {
        return (
            <Route>
                <Route exact path="/" component={Main} />
            </Route>
        );
    }
}
