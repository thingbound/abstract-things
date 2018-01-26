'use strict';

const Thing = require('../thing');
const Sensor = require('./sensor');
const { boolean } = require('../values');

module.exports = Thing.mixin(Parent => class extends Parent.with(Sensor) {
	static get capability() {
		return 'smoke';
	}

	static availableAPI(builder) {
		builder.event('smokeChanged')
			.type('boolean')
			.description('Change in smoke detected')
			.done();

		builder.event('smoke')
			.description('Smoke has been detected')
			.done();

		builder.event('smokeCleared')
			.description('Smoke is no longer detected')
			.done();

		builder.action('smoke')
			.description('Get if smoke is currently detected')
			.returns('boolean', 'Current smoke detected status')
			.done();
	}

	get sensorTypes() {
		return [ ...super.sensorTypes, 'smoke' ];
	}

	smoke() {
		return this.value('smoke');
	}

	updateSmoke(smoke) {
		smoke = boolean(smoke);
		if(this.updateValue('smoke', smoke)) {
			if(smoke) {
				this.emitEvent('smoke');
			} else {
				this.emitEvent('smokeCleared');
			}
		}
	}
});
