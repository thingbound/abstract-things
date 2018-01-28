'use strict';

const Thing = require('../thing');
const Sensor = require('./sensor');
const { boolean, duration } = require('../values');

const idleTimer = Symbol('autoIdle');

module.exports = Thing.mixin(Parent => class extends Parent.with(Sensor) {
	static get capability() {
		return 'carbon-monoxide-detection';
	}

	static availableAPI(builder) {
		builder.event('carbonMonoxideDetectedChanged')
			.type('boolean')
			.description('Change in carbon monoxide detected')
			.done();

		builder.event('carbonMonoxide')
			.description('Carbon monoxide has been detected')
			.done();

		builder.event('carbonMonoxideCleared')
			.description('Carbon monoxide is no longer detected')
			.done();

		builder.action('carbonMonoxideDetected')
			.description('Get if carbon monoxide is currently detected')
			.returns('boolean', 'Current carbonMonoxide detected status')
			.done();
	}

	get sensorTypes() {
		return [ ...super.sensorTypes, 'carbonMonoxideDetected' ];
	}

	carbonMonoxideDetected() {
		return this.value('carbonMonoxideDetected');
	}

	updateCarbonMonoxideDetected(carbonMonoxide, autoIdleTimeout=null) {
		carbonMonoxide = boolean(carbonMonoxide);
		if(this.updateValue('carbonMonoxideDetected', carbonMonoxide)) {
			if(carbonMonoxide) {
				this.emitEvent('carbonMonoxide');
			} else {
				this.emitEvent('carbonMonoxideCleared');
			}
		}

		// Always clear the idle timer
		clearTimeout(this[idleTimer]);

		if(carbonMonoxide && autoIdleTimeout) {
			/*
			 * When carbonMonoxide has been detected and automatic idle is requested
			 * set a timer.
			 */
			const ms = duration(autoIdleTimeout).ms;
			this[idleTimer] = setTimeout(() => this.updateCarbonMonoxideDetected(false), ms);
		}
	}
});
