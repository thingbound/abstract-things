'use strict';

const Thing = require('../thing');
const Sensor = require('./sensor');
const { number } = require('../values');

module.exports = Thing.capability(Parent => class extends Parent.with(Sensor) {
	static get capability() {
		return 'carbonMonoxide';
	}

	static availableAPI(builder) {
		builder.event('carbonMonoxide')
			.type('number')
			.description('Carbon monoxide level has changed')
			.done();

		builder.action('carbonMonoxide')
			.description('Get the current carbon monoxide level')
			.getterForState('carbonMonoxide')
			.returns('number', 'Current carbon monoxide level')
			.done();

		builder.action('co')
			.description('Get the current carbon monoxide level')
			.getterForState('carbonMonoxide')
			.returns('number', 'Current carbon monoxide level')
			.done();
	}

	get sensorTypes() {
		return [ ...super.sensorTypes, 'carbonMonoxide' ];
	}

	get carbonMonoxide() {
		return this.value('carbonMonoxide');
	}

	get co() {
		return this.value('carbonMonoxide');
	}

	updateCarbonMonoxide(value) {
		this.updateValue('carbonMonoxide', number(value));
	}
});
