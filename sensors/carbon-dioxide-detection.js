'use strict';

const Thing = require('../thing');
const Sensor = require('./sensor');
const { boolean, duration } = require('../values');

const idleTimer = Symbol('autoIdle');

module.exports = Thing.mixin(Parent => class extends Parent.with(Sensor) {
	static get capability() {
		return 'carbon-dioxide-detection';
	}

	static availableAPI(builder) {
		builder.event('carbonDioxideDetectedChanged')
			.type('boolean')
			.description('Change in carbon dioxide detected')
			.done();

		builder.event('carbonDioxide')
			.description('Carbon dioxide has been detected')
			.done();

		builder.event('carbonDioxideCleared')
			.description('Carbon dioxide is no longer detected')
			.done();

		builder.action('carbonDioxideDetected')
			.description('Get if carbon dioxide is currently detected')
			.returns('boolean', 'Current carbonDioxide detected status')
			.done();
	}

	get sensorTypes() {
		return [ ...super.sensorTypes, 'carbonDioxideDetected' ];
	}

	carbonDioxideDetected() {
		return this.value('carbonDioxideDetected');
	}

	updateCarbonDioxideDetected(carbonDioxide, autoIdleTimeout=null) {
		carbonDioxide = boolean(carbonDioxide);
		if(this.updateValue('carbonDioxideDetected', carbonDioxide)) {
			if(carbonDioxide) {
				this.emitEvent('carbonDioxide');
			} else {
				this.emitEvent('carbonDioxideCleared');
			}
		}

		// Always clear the idle timer
		clearTimeout(this[idleTimer]);

		if(carbonDioxide && autoIdleTimeout) {
			/*
			 * When carbonDioxide has been detected and automatic idle is requested
			 * set a timer.
			 */
			const ms = duration(autoIdleTimeout).ms;
			this[idleTimer] = setTimeout(() => this.updateCarbonDioxideDetected(false), ms);
		}
	}
});
