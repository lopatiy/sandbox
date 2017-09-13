import React from 'react';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import Agent from '../../agent';
import a from '../../actions';
import _ from 'lodash';

const mapStateToProps = state => {
    return {
        progress: state.video.progress,
        loadingList: state.video.loadingList
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onProgressChange : (payload) => dispatch({type: a.video.PROGRESS_CHANGED, payload}),
    }
};

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
        return (
            <div className="col-lg-12">
                {this.renderVideo(`${_.get(this.props, 'match.params.id')}.mp4`)}
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <div>
                        <Field
                            name="Start"
                            component="input"
                            type="text"
                            placeholder="Start"
                        />
                        <Field
                            name="End"
                            component="input"
                            type="text"
                            placeholder="End"
                        />
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
        );
    }
}

const ConnectedVideoEdit = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(VideoEdit));

export default reduxForm({form: 'videoEdit'})(ConnectedVideoEdit);