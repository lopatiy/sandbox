import React from 'react';
import './item.css';
import _ from 'lodash';

class VideoListItem extends React.Component {
    render() {
        const {video} = this.props;

        const parts = video.split('-');
        const timestamp = parts[1];
        const name = _.tail(_.tail(parts)).join('-');

        return (
            <div key={timestamp} className="item-preview">
                <div className="item-meta">
                    <div className="pull-xs-right">
                        <button
                            className="btn btn-sm btn-outline-primary">
                            <i className="ion-heart"></i> 1
                        </button>
                    </div>
                </div>
                <span className="preview-link">
                    <img alt={name} src={`/dropbox/${video}`}/>
                    <h3>{name}</h3>
                    <p>Video description</p>
                    <ul className="tag-list">
                        {
                            ['football', 'animals'].map(tag => {
                                return (
                                    <li className="tag-default tag-pill tag-outline" key={tag}>
                                        {tag}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </span>
            </div>
        );

    }

}

export default VideoListItem;