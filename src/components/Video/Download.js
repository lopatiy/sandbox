import React from 'react';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import Agent from '../../agent';

import './download.css'

const mapStateToProps = state => {
    return {}
};
const mapDispatchToProps = dispatch => {
    return {}
};

class Download extends React.Component {
    renderFileInput(field) {
        const error = field.meta.touched && field.meta.error && <span className="error">{field.meta.error}</span>;

        return (
            <div className="input-group">
                <span className="input-group-addon" id="basic-addon1">URL</span>
                <input type="text" className="form-control" name={field.name} value={field.input.value}/>
                {error}
            </div>
        )
    }

    onSubmit({downloadUrl}) {
        let body = new FormData();
        body.append('downloadUrl', downloadUrl);
        Agent.Videos.download(body)
            .catch(err => console.error(err))
    }

    render() {
        const {handleSubmit, reset} = this.props;
        return (
            <form className="upload" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <div>
                    <Field
                        name="downloadUrl"
                        component="input"
                        type="text"
                        placeholder="Youtube Video URL"
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
        );
    }
}

const connectedDownload = connect (
    mapStateToProps,
    mapDispatchToProps
)(Download);

export default reduxForm({form: 'downloadForm'})(connectedDownload);