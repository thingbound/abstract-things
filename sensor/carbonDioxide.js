'use strict';

const Thing = require('../thing');
const Sensor = require('./sensor');
const { number } = require('../values');

module.exports = Thing.capability(Parent => class extends Parent.with(Sensor) {
	static get capability() {
		return 'carbonDioxide';
	}

	static availableAPI(builder) {
		builder.event('carbonDioxide')
			.type('number')
			.description('Carbon dioxide level has changed')
			.done();

		builder.action('carbonDioxide')
			.description('Get the current carbon dioxide level')
			.getterForState('carbonDioxide')
			.returns('number', 'Current carbon dixoide level')
			.done();

		builder.action('co2')
			.description('Get the current carbon dioxide level')
			.getterForState('carbonDioxide')
			.returns('number', 'Current carbon dixoide level')
			.done();

		builder.action('co²')
			.description('Get the current carbon dioxide level')
			.getterForState('carbonDioxide')
			.returns('number', 'Current carbon dixoide level')
			.done();
	}

	get sensorTypes() {
		return [ ...super.sensorTypes, 'carbonDioxide' ];
	}

	get carbonDioxide() {
		return this.value('carbonDioxide');
	}

	get co2() {
		return this.value('carbonDioxide');
	}

	get ['co²']() {
		return this.value('carbonDioxide');
	}

	updateCarbonDioxide(value) {
		this.updateValue('carbonDioxide', number(value));
	}
});
