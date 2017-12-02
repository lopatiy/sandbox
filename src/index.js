import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './components/App';
import store from './store';
import {BrowserRouter as Router} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/createMuiTheme';
import MaterialApp from './material-components/App';
import './lib/css/index.css';
import './lib/css/override.css';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <MuiThemeProvider theme={createMuiTheme({palette: {type: 'light'}})}>
                <MaterialApp/>
            </MuiThemeProvider>
        </Router>
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();
