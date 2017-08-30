import React, {Component} from 'react';
import {connect} from 'react-redux'
import { withRouter } from 'react-router';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import {Switch, Route} from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Switch>
                    <Route path="" component={Home}/>
                    <Route path="/login" component={Login}/>
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({location: state.location});
export default withRouter(connect(mapStateToProps, () => ({}))(App));