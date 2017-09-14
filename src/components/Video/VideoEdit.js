import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import Agent from '../../agent';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { reduxForm, Field, change as changeFieldValue } from 'redux-form';

import './VideoEdit.css'

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => bindActionCreators({changeFieldValue}, dispatch);

class VideoEdit extends React.Component {
    renderVideo(id) {
        if (!id) return null;

        return (
            <video ref="video" controls preload="metadata">
                <source src={`/dropbox/${id}`} type="video/mp4"/>
            </video>
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

        return (
            <div className="col-lg-12">
                <div className="edit-page col-lg-8 col-lg-offset-2">
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
                            <button className="btn btn-primary" type="submit">
                                Submit
                            </button>
                            <button className="btn btn-primary" type="button" onClick={reset}>
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