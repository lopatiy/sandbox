import ArticleList from '../ArticleList';
import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
    articles: state.articles,
    place: state.locations.place
});

const mapDispatchToProps = dispatch => ({
    changePlace: (payload) => dispatch({type: 'CHANGE_PLACE', payload})
});


class MainView extends React.Component {
    getPlaces() {
        return [
            {
                id: 'globalFeed',
                link: 'Global Feed',
                component: () => <ArticleList articles={this.props.articles}/>
            }, {
                id: 'videosList',
                link: 'Videos List',
                component: () => <div>videos</div>
            }, {
                id: 'upload',
                link: 'Upload Video',
                component: () => <div>upload</div>
            },
        ]
    }

    changeContent(key = 'globalFeed') {
        this.props.changePlace(key)
    }

    renderTab(place) {
        return (
            <li className="nav-item" key={place.id}>
                <span onClick={this.changeContent.bind(this, place.id)}
                      className={`nav-link ${this.props.place === place.id ? 'active' : ''}`}
                      style={{cursor: 'pointer'}}>
                    {place.link}
                </span>
            </li>
        )
    }

    renderContent(){
        const place = _.find(this.getPlaces(), ({id}) => id === this.props.place);
        if(!place) {
            return <div>Place not found</div>;
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

export default connect(mapStateToProps, mapDispatchToProps)(MainView);