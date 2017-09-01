import ArticleList from '../ArticleList';
import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Upload from '../Video/Upload';

const mapStateToProps = state => ({
    articles: state.articles
});

class MainView extends React.Component {
    getPlaces() {
        return [
            {
                id: '',
                link: 'Global Feed',
                component: () => <ArticleList articles={this.props.articles}/>
            }, {
                id: 'uploaded',
                link: 'Uploaded Videos',
                component: () => <div>videos</div>
            }, {
                id: 'upload',
                link: 'Upload Video',
                component: () => <Upload/>
            }
        ]
    }

    renderTab(place) {
        let activeClass = this.props.place === place.id ? 'active' : '';
        if (!this.props.place && place.id === "") {
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
            <div className="col-md-9">
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

export default connect(mapStateToProps, () => ({}))(MainView);