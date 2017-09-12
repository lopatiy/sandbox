import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Upload from '../Video/Upload';
import Download from '../Video/Download';
import VideoList from '../Video/VideoList';

class MainView extends React.Component {
    getPlaces() {
        return [
            {
                id: 'uploaded',
                link: 'Uploaded Videos',
                component: () => <VideoList/>
            }, {
                id: 'upload',
                link: 'Upload Video',
                component: () => <Upload/>
            }, {
                id: 'download',
                link: 'Download Video',
                component: ()=> <Download/>
            }
        ]
    }

    renderTab(place) {
        let activeClass = this.props.place === place.id ? 'active' : '';
        if (!this.props.place && place.id === "uploaded") {
            activeClass = 'active';
        }

        return (
            <li className="nav-item" key={place.id}>
                <Link to={`/${place.id}`}>
                    <span className={`nav-link ${activeClass}`}
                          style={{cursor: 'pointer'}}>
                        {place.link}
                    </span>
                </Link>
            </li>
        )
    }

    renderContent() {
        const place = _.find(this.getPlaces(), ({id}) => id === this.props.place);
        if (!place) {
            return _.first(this.getPlaces()).component();
        }

        return place.component();
    }

    render() {
        return (
            <div className="col-lg-12">
                <div className="feed-toggle">
                    <ul className="nav nav-pills outline-active">
                        {_.map(this.getPlaces(), this.renderTab.bind(this))}
                    </ul>
                </div>
                {this.renderContent()}
            </div>
        );
    };
}

export default connect(()=>({}), () => ({}))(MainView);