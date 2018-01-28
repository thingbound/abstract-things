'use strict';

const Thing = require('../thing');
const TargetTemperature = require('./target-humidity');
const { temperature } = require('../values');

module.exports = Thing.mixin(Parent => class extends Parent.with(TargetTemperature) {

	static get capability() {
		return 'adjustable-target-temperature';
	}

	static availableAPI(builder) {
		builder.action('targetTemperature')
			.description('Get or set the target temperature')
			.argument('temperature', true, 'Optional target temperature to set')
			.returns('temperature', 'The current or set target temperature')
			.done();

		builder.action('setTargetTemperature')
			.description('Set the target temperature')
			.argument('temperature', false, 'Target temperature to set')
			.returns('temperature', 'The target temperature')
			.done();
	}

	targetTemperature(temperature) {
		if(typeof temperature === 'undefined') {
			return super.targetTemperature();
		}

		return this.setTargetTemperature(temperature);
	}

	setTargetTemperature(target) {
		try {
			target = temperature(target, true);

			return Promise.resolve(this.changeTargetTemperature(temperature))
				.then(() => super.targetTemperature());
		} catch(ex) {
			return Promise.reject(ex);
		}
	}

	changeTargetTemperature(humidity) {
		throw new Error('changeTargetTemperature not implemented');
	}

});
