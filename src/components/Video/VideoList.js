import React from 'react';
import agent from '../../agent';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import VideoItem from './VideoItem';

const mapStateToProps = state => {
    return {
        videos : state.video.uploadedList
    }
};
const mapDispatchToProps = dispatch => ({
    loadVideos: (payload) => dispatch({type: 'VIDEOS_PAGE_LOADED', payload})
});

class VideoList extends React.Component {
    componentDidMount() {
        this.props.loadVideos(agent.Videos.all());
    }

    render() {
        if (!this.props.videos) {
            return (
                <div className="item-preview">Loading...</div>
            );
        }

        if (this.props.videos.length === 0) {
            return (
                <div className="item-preview">
                    No videos are loaded.
                </div>
            );
        }

        return (
            <div>
                {this.props.videos.map(video => <VideoItem key={video} video={video}/>)}
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VideoList));