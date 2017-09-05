import React from 'react';
import agent from '../../agent';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';

const mapStateToProps = state => ({
    videos : state.videos
});
const mapDispatchToProps = dispatch => ({
    loadVideos: (payload) => dispatch({type: 'VIDEOS_PAGE_LOADED', payload})
});

class ArticleList extends React.Component {
    componentDidMount() {
        this.props.loadVideos(agent.Videos.all());
    }

    render() {
        if (!this.props.videos) {
            return (
                <div className="article-preview">Loading...</div>
            );
        }

        if (this.props.videos.length === 0) {
            return (
                <div className="article-preview">
                    No videos are loaded.
                </div>
            );
        }

        return (
            <ul>
                {this.props.videos.map(video =>
                    <li key={video}>{video}</li>)}
            </ul>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleList));