'use strict';

const Worker = require('./worker');
const AccountWatcher = require('../wrappers/account-watcher');

class AccountWorker extends Worker {
	constructor(account, interval){
		super(interval);

		this.accountWatcher = new AccountWatcher(account)
	}

	job(){
		return new Promise((resolve, reject) => {
			this.accountWatcher.execute().then(()=> resolve());
		})
	}
}

module.exports = AccountWorker;