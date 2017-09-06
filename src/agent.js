import axios from 'axios';

const API_ROOT = ``;
const getUrl = (url) => `${API_ROOT}/api${url}`;

const responseData = res => {
    return res.data;
};

const api = {
    get: url => {
        return axios.get(getUrl(url)).then(responseData)
    },
    post: (url, data, onUploadProgress) => {
        const config = {
            url : getUrl(url),
            method: 'post',
            data,
            onUploadProgress
        };

        return axios.request(config).then(responseData);
    }
};

const onUploadProgress = (callback) => {
    return (e) => {
        callback(Math.ceil(e.loaded / e.total * 100));
    }
};

const Videos = {
    upload: (body, progressCallback) => {
        let promise = api.post(`/video-upload`, body, onUploadProgress(progressCallback));
        if(promise){
            return promise.then(responseData);
        }
    },
    all: page => api.get('/videos')
};

export default {
    Videos
};