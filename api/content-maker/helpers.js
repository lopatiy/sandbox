'use strict';

const Client = require('instagram-private-api').V1;
const device = new Client.Device('lopatiy');
const path = require('path');
const storage = new Client.CookieFileStorage(path.resolve(__dirname,'./cookies/cookie1.json'));

const CONST = {
    accounts: {
        main: {
            login: '',
            password: ''
        }
    }
};

function follow(session, id) {
    return Client.Relationship.create(session, id)
}

function unfollow(session, id) {
    return Client.Relationship.destroy(session, id)
}

function getSession() {
    return Client.Session.create(device, storage, CONST.accounts.main.login, CONST.accounts.main.password)
}

/**
 * Upload and post an image
 * @param session
 * @param {string} path
 * @param {string} caption
 */
function uploadPhoto(session, path, caption) {
    // JPEG is the only supported format now, pull request for any other format welcomed!
    Client.Upload.photo(session, path)
        .then(function (upload) {
            // upload instanceof Client.Upload
            // nothing more than just keeping upload id
            console.log(upload.params.uploadId);
            return Client.Media.configurePhoto(session, upload.params.uploadId, caption);
        })
        .then(function (medium) {
            // we configure medium, it is now visible with caption
            console.log(medium.params)
        })
}

/**
 * Upload and post a video
 * @param session
 * @param {string} path .mp4 file
 * @param {string} coverPath .jpg
 * @param {string} caption
 */
function uploadVideo(session, path, coverPath, caption) {
    Client.Upload.video(session, path, coverPath)
        .then((upload) => Client.Media.configureVideo(session, upload.uploadId, caption, upload.durationms))
        .then((medium) => console.log(medium.params))
}

function getAllFollowers(session, account, callback) {
    let feed = new Client.Feed.AccountFollowers(session, account.id);
    feed.on('end', callback);
    feed.all()
}

function getFeed(session, account) {
    console.log('get feed');
    let feed = new Client.Feed.UserMedia(session, account.id);
    return feed.get();
}

function getFollowers(session, account) {
    let feed = new Client.Feed.AccountFollowers(session, account.id, 100);
    return feed.get()
}

function getAccountByName(session, account) {
    return Client.Account.searchForUser(session, account);
}

module.exports = {getSession, getAccountByName, follow, unfollow, getFollowers, getFeed};
