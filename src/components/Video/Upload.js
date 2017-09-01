import React from 'react';
import {reduxForm, Field} from 'redux-form';
import Dropzone from 'react-dropzone';
import Agent from '../../agent';

const FILE_FIELD_NAME = 'files';

class Upload extends React.Component {
    onSubmit(data) {
        var body = new FormData();
        Object.keys(data).forEach((key) => {
            body.append(key, data[key]);
        });

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
                <Dropzone onDrop={( filesToUpload, e ) => field.input.onChange(filesToUpload)}
                          name={field.name}>
                    <div>Try dropping some files here, or click to select files to upload.</div>
                </Dropzone>
                {error}
                {files && Array.isArray(files) &&
                (<ul>{ files.map((file, i) => <li key={i}>{file.name}</li>) }</ul>)}
            </div>
        );
    }

    render() {
        const {handleSubmit, reset} = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <div>
                    <label htmlFor={FILE_FIELD_NAME}>Files</label>
                    <Field name={FILE_FIELD_NAME} component={this.renderDropzoneInput}
                    />
                </div>
                <div>
                    <button type="submit">
                        Submit
                    </button>
                    <button onClick={reset}>
                        Clear Values
                    </button>
                </div>
            </form>
        );
    }
}

export default reduxForm({form: 'simple'})(Upload);