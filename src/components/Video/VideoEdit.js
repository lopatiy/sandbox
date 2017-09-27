import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import Agent from '../../agent';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { reduxForm, Field, change as changeFieldValue } from 'redux-form';
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';

import './VideoEdit.css'

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => bindActionCreators({changeFieldValue}, dispatch);

class VideoEdit extends React.Component {
    constructor(props,context){
        super(props,context);

        this.state = {};
    }

    renderVideo(id) {
        if (!id) {
            return null;
        }

        return (
            <div className='video-container' style={{width: '100%'}}>
                <Video preload="metadata"
                       controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}>
                    <source src={`/dropbox/${id}`} type="video/mp4"/>
                </Video>
                <canvas ref="canvas" style={{width: '100%', height: '100%'}} />
            </div>
        )
    }

    onSubmit({Start, End}) {
        let body = new FormData();
        if (Start && End) {
            body.append('video', _.get(this.props, 'match.params.id'));
            body.append('start', Start);
            body.append('end', End);
            Agent.Videos.cut(body)
                .then((filename) => this.update())
                .catch(err => console.error(err))
        }
    }

    setTiming(field){
        const videoElement = ReactDOM.findDOMNode(this.refs.video);
        let value = videoElement.currentTime,
            time = _([value/3600, value / 60, value % 60])
                .map(Math.floor)
                .map((el) => _.padStart(el, 2, '0')).join(':');

        if(videoElement){
            this.props.changeFieldValue('videoEdit', field, time);
        }
    }

    render() {
        const {handleSubmit, reset} = this.props;
        const id = _.get(this.props, 'match.params.id');

        const crop = () => {
            this.setState({crop:true, rect: this.refs.video.getBoundingClientRect()})
        };

        return (
            <div className="col-lg-12">
                <div className="edit-page col-lg-10 col-lg-offset-1">
                    {this.renderVideo(`${id}.mp4`)}
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <div>
                            <div className="input-group">
                                <Field
                                    readOnly
                                    name="Start"
                                    component="input"
                                    className="form-control"
                                    type="text"
                                    placeholder="Start"
                                />
                            <span className="input-group-btn">
                                <button className="btn btn-primary" type="button" onClick={this.setTiming.bind(this,'Start')}>
                                    <i className="fa fa-arrow-left"/>
                                </button>
                            </span>
                            </div>
                            <div className="input-group">
                                <Field
                                    readOnly
                                    name="End"
                                    component="input"
                                    className="form-control"
                                    type="text"
                                    placeholder="End"
                                />
                            <span className="input-group-btn">
                                <button className="btn btn-primary" type="button" onClick={this.setTiming.bind(this,'End')}>
                                    <i className="fa fa-arrow-left"/>
                                </button>
                            </span>
                            </div>
                        </div>
                        <span className="clearfix"/>
                        <div className="buttons ">
                            <button className="btn btn-primary pull-right" type="submit">
                                Submit
                            </button>
                            <button className="btn btn-primary pull-right" type="button" onClick={crop.bind(this)}>
                                Crop
                            </button>
                            <button className="btn btn-primary pull-left" type="button" onClick={reset}>
                                Clear
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const ConnectedVideoEdit = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(VideoEdit));

export default reduxForm({form: 'videoEdit'})(ConnectedVideoEdit);