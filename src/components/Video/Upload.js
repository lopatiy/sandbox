import React from 'react';
import {reduxForm, Field} from 'redux-form';
import Dropzone from 'react-dropzone';
import Agent from '../../agent';
import './upload.css';

const FILE_FIELD_NAME = 'files';

class Upload extends React.Component {
    onSubmit(data) {
        var body = new FormData();
        data.files.map((file) => body.append('files', file, file.name));

        console.info('POST', body, data);
        console.info('This is expected to fail:');
        Agent.Videos.upload(body)
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.error(err));
    }

    renderDropzoneInput(field) {
        const files = field.input.value;
        const error = field.meta.touched && field.meta.error && <span className="error">{field.meta.error}</span>;

        return (
            <div>
                <Dropzone className="drop-zone" onDrop={( filesToUpload, e ) => field.input.onChange(filesToUpload)}
                          name={field.name}>
                    <div>+ Add files</div>
                </Dropzone>
                {error}
                {files && Array.isArray(files) &&
                (<ul className="file">{ files.map((file, i) => <li key={i}>{file.name}</li>) }</ul>)}
            </div>
        );
    }

    render() {
        const {handleSubmit, reset} = this.props;
        return (
            <form className="upload" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <div>
                    <Field name={FILE_FIELD_NAME} component={this.renderDropzoneInput}/>
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

export default reduxForm({form: 'simple'})(Upload);