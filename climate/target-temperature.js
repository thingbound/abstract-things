'use strict';

const Thing = require('../thing');
const State = require('../common/state');
const { temperature } = require('../values');

module.exports = Thing.mixin(Parent => class extends Parent.with(State) {

	static get capability() {
		return 'target-temperature';
	}

	static availableAPI(builder) {
		builder.event('targetTemperatureChanged')
			.type('temperature')
			.description('The target temperature has changed')
			.done();

		builder.action('targetTemperature')
			.description('Get the target temperature')
			.returns('temperature', 'The target temperature')
			.done();
	}

	targetHumidity() {
		return Promise.resolve(this.getState('targetTemperature'));
	}

	updateTargetHumidity(target) {
		target = temperature(target);

		if(this.updateState('targetTemperature', target)) {
			this.emitEvent('targetTemperatureChanged', target);
		}
	}
});
