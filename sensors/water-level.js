'use strict';

const Thing = require('../thing');
const Sensor = require('./sensor');
const { percentage } = require('../values');

module.exports = Thing.mixin(Parent => class extends Parent.with(Sensor) {
	static get capability() {
		return 'water-level';
	}

	static availableAPI(builder) {
		builder.event('waterLevelChanged')
			.type('percentage')
			.description('Current water level has changed')
			.done();

		builder.action('waterLevel')
			.description('Get the current water level')
			.getterForState('waterLevel')
			.returns('percentage', 'Current water level')
			.done();

		builder.action('wl')
			.description('Get the current water level')
			.getterForState('waterLevel')
			.returns('percentage', 'Current water level')
			.done();
	}

	get sensorTypes() {
		return [ ...super.sensorTypes, 'waterLevel' ];
	}

	waterLevel() {
		return this.value('waterLevel');
	}

	wl() {
		return this.value('waterLevel');
	}

	updateWaterLevel(value) {
		this.updateValue('waterLevel', percentage(value));
	}
});
