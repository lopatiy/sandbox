const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/video-queue', {
    useMongoClient: true
});

const QueueItemState = {
    ERROR: 1,
    NEW : 2,
    LOADING : 3,
    DOWNLOADED: 4,
    UPLOADED: 5
};

const queuedVideoSchema = new Schema({
    name: {type : String, unique : true, required: true},
    url: {type : String, required: true},
    state: {type : Number, required: true}
});


const QueuedVideo = mongoose.model('Video', queuedVideoSchema);
module.exports = {QueueItemState, QueuedVideo};