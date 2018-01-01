'use strict';

const Thing = require('./thing');
const { duration } = require('./values');

const pollDuration = Symbol('pollDuration');
const pollTimer = Symbol('pollTimer');

module.exports = Thing.mixin(Parent => class extends Parent {

	constructor(...args) {
		super(...args);

		this[pollDuration] = 30000;
		this.internalPoll = this.internalPoll.bind(this);
	}

	updatePollDuration(time) {
		time = this[pollDuration] = duration(time).ms;

		if(this[pollTimer]) {
			clearTimeout(this[pollTimer]);

			this[pollTimer] = setTimeout(this.internalPoll, time);
		}
	}

	initCallback() {
		return super.initCallback()
			.then(() => {
				// During initalization a single poll is performed
				this.internalPoll(true);
			});
	}

	destroyCallback() {
		return super.destroyCallback()
			.then(() => clearTimeout(this[pollTimer]));
	}

	internalPoll(isInitial=false) {
		const time = Date.now();

		// Perform poll async - and schedule new poll after it has resolved
		Promise.resolve(this.poll(isInitial))
			.catch(ex => this.debug('Could not poll:', ex))
			.then(() => {
				const diff = Date.now() - time;
				const d = this[pollDuration];

				let nextTime = d - diff;
				while(nextTime < 0) {
					nextTime += d;
				}

				this[pollTimer] = setTimeout(this.internalPoll, nextTime);
			});
	}

	poll(isInitial) {
		throw new Error('Poll has not been implemented');
	}
});
