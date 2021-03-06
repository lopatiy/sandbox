import React from 'react';
import agent from '../../agent';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import VideoItem from './VideoItem';
import _ from 'lodash';

import './VideoList.css'

const mapStateToProps = state => {
    return {
        videos : state.video.uploadedList
    }
};
const mapDispatchToProps = dispatch => ({
    loadVideos: (payload) => dispatch({type: 'VIDEOS_PAGE_LOADED', payload})
});

class VideoList extends React.Component {
    updateList () {
        this.props.loadVideos(agent.Videos.all())
    }

    componentDidMount() {
        this.updateList();
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
                {_.map(_.reverse(_.clone(this.props.videos)), video =>
                    <VideoItem key={video} video={video} updateList={this.updateList.bind(this)}/>)}
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VideoList));