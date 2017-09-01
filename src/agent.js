import axios from 'axios';

const EXT_API_ROOT = 'https://conduit.productionready.io/api';
const API_ROOT = `${document.location.hostname}:3000`;
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
        const config = {
            method: 'post',
            url: getUrl(url),
            data:data,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        };

        return axios.request(config).then(responseData);
    }
};

const Articles = {
    all: page => extRequests.get(`/articles?limit=10`)
};

const Videos = {
    upload: (body) => {
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