import Banner from './Banner';
import MainView from './MainView';
import React from 'react';
import agent from '../../agent';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
    loadArticles: (payload) => dispatch({type: 'HOME_PAGE_LOADED', payload})
});

class Home extends React.Component {
    componentDidMount() {
        this.props.loadArticles(agent.Articles.all());
    }

    render() {
        return (
            <div className="home-page">
                <Banner/>
                <div className="container page">
                    <div className="row">
                        <MainView/>
                        <div className="col-md-3">
                            <div className="sidebar">
                                <p>Popular Tags</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
