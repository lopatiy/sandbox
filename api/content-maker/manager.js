'use strict';

class Manager {
	constructor(){
		this.process = {}
	}

	execute(worker){
		const id = Math.random() * 10000;
		this.process[id] = worker;
		this.process[id].start();
		return () => this.process[id].stop();
	}
}

module.exports = Manager;