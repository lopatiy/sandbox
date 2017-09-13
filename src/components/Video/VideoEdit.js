import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import Agent from '../../agent';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { reduxForm, Field, reset, change as changeFieldValue } from 'redux-form';

import './VideoEdit.css'

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => bindActionCreators({changeFieldValue});

class VideoEdit extends React.Component {
    renderVideo(id) {
        if (!id) return null;

        return (
            <video ref="video" controls preload="metadata">
                <source src={`/dropbox/${id}`} type="video/mp4"/>
            </video>
        )
    }

    onSubmit({video, start, end}) {
        if (video && start && end) {
            let body = new FormData();
            body.append('video', video);
            body.append('start', start);
            body.append('end', end);
            Agent.Videos.cut(body)
                .then((filename) => this.update())
                .catch(err => console.error(err))
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
                                    name="Start"
                                    component="input"
                                    className="form-control"
                                    type="text"
                                    placeholder="Start"
                                />
                            <span className="input-group-btn">
                                <button className="btn btn-primary" type="button">
                                    <i className="fa fa-arrow-left"/>
                                </button>
                            </span>
                            </div>
                            <div className="input-group">
                                <Field
                                    name="End"
                                    component="input"
                                    className="form-control"
                                    type="text"
                                    placeholder="End"
                                />
                            <span className="input-group-btn">
                                <button className="btn btn-primary" type="button">
                                    <i className="fa fa-arrow-left"/>
                                </button>
                            </span>
                            </div>
                        </div>
                        <div className="buttons">
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