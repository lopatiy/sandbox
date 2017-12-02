'use strict'

const winston = require('winston');

class Worker {
	constructor(interval){
		this.interval = interval;
	}

	iteration(){
		if(!this.seized){
			this.seized = true;
			return new Promise((resolve, reject) => {
				this.job().then(() => {
					resolve();
				})	
			}).then(() => this.resolved())
		} else {
			winston.info('Worker seized. Skipping.')
		}
	}

	job(){
		return new Promise((resolve, reject)=> {
			console.log('Pure worker iteration');
			resolve();
		})
	}

	resolved(){
		this.seized = false;
	}

	start(){
		this.timer = setInterval(() => this.iteration(), this.interval); 
		return this.timer;
	}

	stop(){
		clearInterval(this.timer);
	}
}

module.exports = Worker;