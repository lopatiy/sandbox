import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './components/App';
import store from './store';
import {Router} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'
import {syncHistoryWithStore} from 'react-router-redux';

import registerServiceWorker from './registerServiceWorker';
const history = syncHistoryWithStore(createBrowserHistory(), store);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();
