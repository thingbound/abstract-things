'use strict';

const Thing = require('../thing');
const Sensor = require('./sensor');
const { boolean, duration } = require('../values');

const idleTimer = Symbol('autoIdle');

module.exports = Thing.mixin(Parent => class extends Parent.with(Sensor) {
	static get capability() {
		return 'water-detection';
	}

	static availableAPI(builder) {
		builder.event('waterDetectedChanged')
			.type('boolean')
			.description('Change in water detected')
			.done();

		builder.event('water')
			.description('Water has been detected')
			.done();

		builder.event('waterCleared')
			.description('Water is no longer detected')
			.done();

		builder.action('waterDetected')
			.description('Get if water is currently detected')
			.returns('boolean', 'Current water detected status')
			.done();
	}

	get sensorTypes() {
		return [ ...super.sensorTypes, 'waterDetected' ];
	}

	waterDetected() {
		return this.value('waterDetected');
	}

	updateWaterDetected(water, autoIdleTimeout=null) {
		water = boolean(water);
		if(this.updateValue('waterDetected', water)) {
			if(water) {
				this.emitEvent('water');
			} else {
				this.emitEvent('waterCleared');
			}
		}

		// Always clear the idle timer
		clearTimeout(this[idleTimer]);

		if(water && autoIdleTimeout) {
			/*
			 * When water has been detected and automatic idle is requested
			 * set a timer.
			 */
			const ms = duration(autoIdleTimeout).ms;
			this[idleTimer] = setTimeout(() => this.updateWaterDetected(false), ms);
		}
	}
});
