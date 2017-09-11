import React from 'react';
import './VideoItem.css';
import _ from 'lodash';
import agent from '../../agent';

class VideoListItem extends React.Component {
    renderPreview(name){
        if(_.endsWith(name, '.mp4')){
            return (
                <video controls preload="metadata">
                <source src={`/dropbox/${name}`} type="video/mp4"/>
            </video>)
        } else {
            return (<img alt={name} src={`/dropbox/${name}`}/>)
        }
    }

    deleteVideo(filename){
        if(window.confirm(`Delete ${filename}?`)){
            agent.Videos.deleteVideo(filename)
                .then(()=> this.props.updateList())
        }
    }

    render() {
        const {video} = this.props;
        return (
            <div key={video} className="item-preview">
                <span className="preview-link">
                    {this.renderPreview(video)}
                    <h3>
                        {video}
                        <i className="fa fa-trash-o pull-right" onClick={this.deleteVideo.bind(this, video)}/>
                    </h3>
                    <p>Video description</p>
                    {/*<ul className="tag-list">
                        {
                            ['football', 'animals'].map(tag => {
                                return (
                                    <li className="tag-default tag-pill tag-outline" key={tag}>
                                        {tag}
                                    </li>
                                )
                            })
                        }
                    </ul>*/}
                </span>
            </div>
        );
    }
}

export default VideoListItem;