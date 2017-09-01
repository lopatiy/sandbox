import Banner from './Banner';
import MainView from './MainView';
import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';

class Home extends React.Component {
    render() {
        return (
            <div className="home-page">
                <Banner/>
                <div className="container page">
                    <div className="row">
                        <MainView place={this.props.place}/>
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

export default withRouter(connect(state=>({}), ()=>({}))(Home));
