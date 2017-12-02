'use strict';

const i = require('../helpers');
const _ = require('lodash');
const winston = require('winston');

class AccountWatcher {
    constructor(account) {
        this.first = true; 
        this.account = account;
        this.previous = [];
    }

    difference(current) {
        if (this.first) {
            this.first = false;
            this.previous = _.map(current, 'id');
            return [];
        }

        const next = _.map(current, 'id');
        const result = _.difference(next, this.previous);
        this.previous = next;
        return result;
    }

    process(difference) {
        return new Promise((resolve, reject) => {
            if (this.first || difference.length < 1) {    
                winston.info('IDLE');
                resolve();
            } else {
                this.first = false;
                winston.info('difference found:', difference.length );
                const promises = _.map(difference, (id) => i.follow(this.session, id));
                Promise.all(promises).then((result)=> resolve())
            }
        })
    }

    execute() {
        winston.info('Account watcher iteration');
        return i.getSession()
        .then(session => {
            this.session = session;
            return i.getAccountByName(this.session, this.account);
        })
        .then(account => i.getFollowers(this.session, account))
        .then(followers => {
            winston.info('Got followers - ', followers.length, ', last :', followers[0].id);
            return this.process(this.difference(followers))
        })
    }
}

module.exports = AccountWatcher;


