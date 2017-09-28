import React from 'react';
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

        let initialX, initialY;

        const watchMouse = (e) => {
                const canvas = this.refs.canvas;
                const rect = this.refs.canvas.getBoundingClientRect();
                canvas.width = rect.width;
                canvas.height = rect.height;
                const context = canvas.getContext('2d');

                context.fillStyle = 'rgba(0,0,0,0.6)';
                context.fillRect(0, 0, canvas.width, canvas.height);
                context.clearRect(initialX, initialY, e.layerX - initialX, e.layerY - initialY);
            },
            startWatching = (e) => {
                initialX = e.nativeEvent.layerX;
                initialY = e.nativeEvent.layerY;
                this.refs.canvas.addEventListener('mousemove', watchMouse)
            },
            stopWatching = (e) => {
                this.refs.canvas.removeEventListener('mousemove', watchMouse);
                this.setState({
                    crop : {
                        x:initialX,
                        y:initialY,
                        w:e.nativeEvent.layerX - initialX,
                        h:e.nativeEvent.layerY - initialY
                    }
                });
                initialX = initialY = null;
            };

        return (
            <div className='video-container' style={{width: '100%'}}>
                <Video preload="metadata" ref="video"
                       controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}>
                    <source src={`/dropbox/${id}`} type="video/mp4"/>
                </Video>
                <canvas ref="canvas" style={{width: '100%', height: '100%'}}
                onMouseDown={startWatching}
                onMouseUp={stopWatching}/>
            </div>
        )
    }
    
    calculateVideoPoint(x,y) {
        const rect = this.refs.video.videoEl.getBoundingClientRect();
        const originalRect = {
            width: this.refs.video.videoEl.videoWidth,
            height: this.refs.video.videoEl.videoHeight,
        };

        return {
            x: x / (rect.width / originalRect.width),
            y: y / (rect.height / originalRect.height),
        }
    }

    onSubmit({Start, End}) {
        let body = new FormData();
        body.append('video', _.get(this.props, 'match.params.id'));
        if(Start && End){
            body.append('start', Start);
            body.append('end', End);
        }
        if(this.state.crop){
            const a = this.calculateVideoPoint(this.state.crop.x, this.state.crop.y);
            const b = this.calculateVideoPoint(this.state.crop.w, this.state.crop.h);
            body.append('x', a.x);
            body.append('y', a.y);
            body.append('w', b.x);
            body.append('h', b.y);
        }
        Agent.Videos.cut(body)
            .then((filename) => this.update())
            .catch(err => console.error(err))
    }

    setTiming(field){
        const videoElement = this.refs.video.videoEl;
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