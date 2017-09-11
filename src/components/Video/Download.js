import React from 'react';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import { withRouter } from 'react-router'
import Agent from '../../agent';
import a from  '../../actions';
import agent from  '../../agent';
import _ from  'lodash';
import dateformat from 'dateformat';

import './Download.css'

const mapStateToProps = state => {
    return {
        loading : state.video.loadingList
    }
};
const mapDispatchToProps = dispatch => {
    return {
        loadLoading: (payload) => dispatch({type:a.video.UPLOAD_LOADED, payload})
    }
};

class Download extends React.Component {
    componentDidMount(){
        this.update();
    }

    update(){
        this.props.loadLoading(agent.Videos.loading());
    }

    onSubmit({downloadUrl}) {
        if(downloadUrl){
            let body = new FormData();
            body.append('downloadUrl', downloadUrl);
            Agent.Videos.download(body)
                .then((filename) => this.update())
                .catch(err => console.error(err))
        }
    }

    render() {
        const renderItem = (video) =>
            (
                <li className='list-group-item' key={video.name}>
                    Since {dateformat(parseInt(video.name, 10), 'HH:MM:ss, d mmm')}
                    <a href={video.url}>
                        <i className="fa fa-arrow-circle-o-right pull-right" style={{fontSize: '1.5em'}}/>
                    </a>
                </li>
            );

        const {handleSubmit, reset} = this.props;
        return (
            <div>
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
                <hr/>
                <h5>Loading Queue: <i className="fa fa-refresh pull-right pointer" onClick={this.update.bind(this)}/></h5>
                <ul className='list-group'>
                    {_.map(this.props.loading, renderItem)}
                </ul>
            </div>
        );
    }
}

const connectedDownload = connect (
    mapStateToProps,
    mapDispatchToProps
)(Download);

export default withRouter(reduxForm({form: 'downloadForm'})(connectedDownload));