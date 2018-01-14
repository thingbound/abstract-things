'use strict';

const Thing = require('../thing');
const State = require('../common/state');
const ChargingState = require('./charging-state');

module.exports = Thing.mixin(Parent => class extends Parent.with(State, ChargingState) {

	static get capability() {
		return 'autonomous-cleaning';
	}

	static availableAPI(builder) {
		builder.action('charge')
			.description('Start charging thing')
			.done();
	}

	charge() {
		return Promise.resolve(this.activateCharging())
			.then(() => null);
	}

	activateCharging() {
		throw new Error('activateCharging not implemented');
	}

});
