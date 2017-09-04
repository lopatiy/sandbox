import axios from 'axios';

const EXT_API_ROOT = 'https://conduit.productionready.io/api';
const API_ROOT = ``;
const getUrl = (url) => `${API_ROOT}/api${url}`;

const responseData = res => {
    return res.data;
};

const extRequests = {
    get: url =>
        axios.get(`${EXT_API_ROOT}${url}`).then(responseData)
};

const api = {
    get: url =>
        axios.get(`${API_ROOT}${url}`).then(responseData),
    post: (url, data) => {
        return axios.post(getUrl(url), data).then(responseData);
    },
    put: (url, data, progress) => {
        var config = {
            onUploadProgress: function (progressEvent) {
                progress(Math.round((progressEvent.loaded * 100) / progressEvent.total))
            }
        };

        return axios.put('/video-upload', data, config)
    }
};

const Articles = {
    all: page => extRequests.get(`/articles?limit=10`)
};

const Videos = {
    upload: (body, progres) => {
        let promise = api.post(`/video-upload`, body);
        if(promise){
            return promise.then(responseData);
        }
    }
};

export default {
    Articles,
    Videos
};