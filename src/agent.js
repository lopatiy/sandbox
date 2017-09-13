import axios from 'axios';

const API_ROOT = ``;
const getUrl = (url) => `${API_ROOT}/api${url}`;

const responseData = res => {
    return res.data;
};

const api = {
    get: url => axios.get(getUrl(url)).then(responseData),
    delete: url => axios.delete(getUrl(url)).then(responseData),
    post: (url, data, onUploadProgress) => {
        const config = {
            url: getUrl(url),
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
    all: page => api.get('/videos'),
    loading: () => api.get('/loading-videos'),
    upload: (body, progressCallback) => api.post(`/video-upload`, body, onUploadProgress(progressCallback)).then(responseData),
    download: (body) => api.post(`/video-download`, body).then(responseData),
    cut: (body) => api.post(`/video-cut`, body),
    deleteVideo: (filename) => api.delete(`/video/${filename}`)
};

export default {
    Videos
};