'use strict';

const Manager = require('./manager');
const AccountWorker = require('./workers/account-worker');
const winston = require('winston');
const i = require('./helpers');
const _ = require('lodash');

function start(){
	winston.info('Application started');
	const manager = new Manager();
	const worker = new AccountWorker('pora_chehlitsa', 1000);

	const stop = manager.execute(worker);
	setTimeout(stop, 120 * 1000)
}

function getAccount(accountName) {
    return i.getSession()
        .then(session => {
            console.log(accountName);
            return i.getAccountByName(session, accountName)
        })
}

function getMaterials(account) {
    i.getSession()
        .then(session => {
            i.getAccountByName(session, account)
                .then(account => i.getFeed(session, account))
                .then(feed => {
                    console.log(_.take(feed, 5))
                });
        })
}

module.exports = {getAccount, getMaterials};