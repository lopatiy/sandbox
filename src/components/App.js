import React, {Component} from 'react';
import {connect} from 'react-redux'
import { withRouter } from 'react-router';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import {Switch, Route} from 'react-router-dom';

const renderMergedProps = (component, ...rest) => {
    const finalProps = Object.assign({}, ...rest);
    return (
        React.createElement(component, finalProps)
    );
};

const PropsRoute = ({ component, ...rest }) => {
    return (
        <Route {...rest} render={routeProps => {
      return renderMergedProps(component, routeProps, rest);
    }}/>
    );
};

class App extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Switch>
                    <Route path="/" exact key="feed" component={Home} place=""/>
                    <PropsRoute path="/uploaded" exact key="uploaded" component={Home} place="uploaded"/>
                    <PropsRoute path="/upload" exact key="upload" component={Home} place="upload"/>
                    <Route path="/login" key="login" component={Login}/>
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({routing: state.routing});
export default withRouter(connect(mapStateToProps, () => ({}))(App));