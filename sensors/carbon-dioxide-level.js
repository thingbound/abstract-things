'use strict';

const Thing = require('../thing');
const Sensor = require('./sensor');
const { number } = require('../values');

module.exports = Thing.mixin(Parent => class extends Parent.with(Sensor) {
	static get capability() {
		return 'carbon-dioxide-level';
	}

	static availableAPI(builder) {
		builder.event('carbonDioxideLevelChanged')
			.type('number')
			.description('Carbon dioxide level has changed')
			.done();

		builder.action('carbonDioxideLevel')
			.description('Get the current carbon dioxide level')
			.getterForState('carbonDioxide')
			.returns('number', 'Current carbon dixoide level')
			.done();

		builder.action('co2Level')
			.description('Get the current carbon dioxide level')
			.getterForState('carbonDioxide')
			.returns('number', 'Current carbon dixoide level')
			.done();
	}

	get sensorTypes() {
		return [ ...super.sensorTypes, 'carbonDioxideLevel' ];
	}

	carbonDioxideLevel() {
		return this.value('carbonDioxideLevel');
	}

	co2Level() {
		return this.value('carbonDioxideLevel');
	}

	updateCarbonDioxideLevel(value) {
		this.updateValue('carbonDioxideLevel', number(value));
	}
});
