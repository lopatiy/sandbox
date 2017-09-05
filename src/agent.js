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
    get: url => {
        return axios.get(getUrl(url)).then(responseData)
    },
    post: (url, data) => {
        return axios.post(getUrl(url), data).then(responseData);
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
    },
    all: page => api.get('/videos')
};

export default {
    Articles,
    Videos
};