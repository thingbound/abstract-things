'use strict';

const Thing = require('../thing');
const Sensor = require('./sensor');
const { boolean, duration } = require('../values');

const idleTimer = Symbol('autoIdle');

module.exports = Thing.mixin(Parent => class extends Parent.with(Sensor) {
	static get capability() {
		return 'smoke-detection';
	}

	static availableAPI(builder) {
		builder.event('smokeDetectedChanged')
			.type('boolean')
			.description('Change in smoke detected')
			.done();

		builder.event('smoke')
			.description('Smoke has been detected')
			.done();

		builder.event('smokeCleared')
			.description('Smoke is no longer detected')
			.done();

		builder.action('smokeDetected')
			.description('Get if smoke is currently detected')
			.returns('boolean', 'Current smoke detected status')
			.done();
	}

	get sensorTypes() {
		return [ ...super.sensorTypes, 'smokeDetected' ];
	}

	smokeDetected() {
		return this.value('smokeDetected');
	}

	updateSmokeDetected(smoke, autoIdleTimeout=null) {
		smoke = boolean(smoke);
		if(this.updateValue('smokeDetected', smoke)) {
			if(smoke) {
				this.emitEvent('smoke');
			} else {
				this.emitEvent('smokeCleared');
			}
		}

		// Always clear the idle timer
		clearTimeout(this[idleTimer]);

		if(smoke && autoIdleTimeout) {
			/*
			 * When smoke has been detected and automatic idle is requested
			 * set a timer.
			 */
			const ms = duration(autoIdleTimeout).ms;
			this[idleTimer] = setTimeout(() => this.updateSmokeDetected(false), ms);
		}
	}
});
