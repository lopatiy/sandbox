import React from 'react';
import './VideoItem.css';
import _ from 'lodash';
import agent from '../../agent';
import {Link} from 'react-router-dom';

class VideoListItem extends React.Component {
    constructor(props, context){
        super(props, context);
        this.state = {
            showControls: false
        }
    }

    renderVideo(name) {
        const toggleControls = () => this.setState({showControls: !this.state.showControls});

        return (
            <video controls={this.state.showControls} preload="metadata" onMouseEnter={toggleControls} onMouseLeave={toggleControls}>
                <source src={`/dropbox/${name}`} type="video/mp4"/>
            </video>
        )
    }

    renderImage(name) {
        return (
            <img alt={""} src={`/dropbox/${name}`}/>
        )
    }


    renderPreview(name) {
        return _.endsWith(name, '.mp4') ? this.renderVideo(name) : this.renderImage(name)
    }

    deleteVideo(filename) {
        if (window.confirm(`Delete ${filename}?`)) {
            agent.Videos.deleteVideo(filename)
                .then(()=> this.props.updateList())
        }
    }

    render() {
        const {video} = this.props;

        let timestamp = _.initial(video.split('.')).join('.');

        return (
            <div key={video} className="item-preview col-sm-12 col-md-4">
                <span className="preview-link">
                    {this.renderPreview(video)}
                </span>
                <h5>
                    <Link to={`/video/${timestamp}`}>
                        <span className="pointer pull-right">Edit</span>
                    </Link>
                    <i className="fa fa-trash-o pointer" onClick={this.deleteVideo.bind(this, video)}/>
                </h5>
            </div>
        );
    }
}

export default VideoListItem;