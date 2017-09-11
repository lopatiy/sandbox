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

class Upload extends React.Component {
    onSubmit(data){
        if(data.videoUrl){
            const formData = new FormData();
            formData.append('downloadUrl', data.videoUrl);
            Agent.Videos.download(formData)
                .catch(err => console.error(err));
        }
    }

    renderFileInput(field) {
        const error = field.meta.touched && field.meta.error && <span className="error">{field.meta.error}</span>;

        return (
            <div className="input-group">
                <span className="input-group-addon" id="basic-addon1">URL</span>
                <input type="text" className="form-control"  name={field.name} value={field.input.value}/>
                {error}
            </div>
        )
    }

    render() {
        const {handleSubmit, reset} = this.props;
        return (
            <form className="upload" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <div>
                    <Field name="videoUrl" component={this.renderFileInput.bind(this)}/>
                </div>
                <div className="buttons">
                    <button className="btn btn-primary" type="submit">
                        Submit
                    </button>
                    <button className="btn btn-primary" onClick={reset}>
                        Clear
                    </button>
                </div>
            </form>
        );
    }
}

const ConnectedUpload = connect (
    mapStateToProps,
    mapDispatchToProps
)(Upload);

export default reduxForm({form: 'simple'})(ConnectedUpload);