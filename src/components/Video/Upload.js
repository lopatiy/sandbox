import React from 'react';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import Dropzone from 'react-dropzone';
import Agent from '../../agent';
import a from '../../actions';
import './upload.css';
import _ from 'lodash';

const FILE_FIELD_NAME = 'files';
const mapStateToProps = state => {
    return {progress: state.video.progress}
};
const mapDispatchToProps = dispatch => {
    return {
        onProgressChange :
            (value) => dispatch({type: a.video.PROGRESS_CHANGED,payload: value})
    }
};

class Upload extends React.Component {
    onSubmit(data) {
        if(data.files){
            const formData = new FormData();
            data.files.map((file) => formData.append('files', file, file.name));
            Agent.Videos.upload(formData,this.props.onProgressChange)
                .catch(err => console.error(err));
        }
    }

    renderDropzoneInput(field) {
        const files = field.input.value;
        const error = field.meta.touched && field.meta.error && <span className="error">{field.meta.error}</span>;

        const fileItems = files && _.map(files, this.renderFile.bind(this));

        return (
            <div>
                <Dropzone className="drop-zone" onDrop={( filesToUpload, e ) => field.input.onChange(filesToUpload)}
                          name={field.name}>
                    <div>+ Add files</div>
                </Dropzone>
                {error}
                {fileItems}
            </div>
        );
    }

    renderFile(file, i){
        return (
            <span className="file" key={i}>
                <div className="progress">
                    <span>{file.name} {this.props.progress ? ` - ${this.props.progress}%` : ''}</span>
                    <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40"
                         aria-valuemin="0" aria-valuemax="100" style={{width:this.props.progress+'%'}}>
                    </div>
                </div>
            </span>
        )
    }

    render() {
        const {handleSubmit, reset} = this.props;
        return (
            <form className="upload" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <div>
                    <Field name={FILE_FIELD_NAME} component={this.renderDropzoneInput.bind(this)}/>
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