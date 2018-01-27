'use strict';

const Thing = require('../thing');
const Sensor = require('./sensor');
const { number } = require('../values');

module.exports = Thing.mixin(Parent => class extends Parent.with(Sensor) {
	static get capability() {
		return 'carbon-monoxide-level';
	}

	static availableAPI(builder) {
		builder.event('carbonMonoxideLevelChanged')
			.type('number')
			.description('Carbon monoxide level has changed')
			.done();

		builder.action('carbonMonoxideLevel')
			.description('Get the current carbon monoxide level')
			.getterForState('carbonMonoxide')
			.returns('number', 'Current carbon monoxide level')
			.done();

		builder.action('coLevel')
			.description('Get the current carbon monoxide level')
			.getterForState('carbonMonoxide')
			.returns('number', 'Current carbon monoxide level')
			.done();
	}

	get sensorTypes() {
		return [ ...super.sensorTypes, 'carbonMonoxideLevel' ];
	}

	carbonMonoxideLevel() {
		return this.value('carbonMonoxideLevel');
	}

	coLevel() {
		return this.value('carbonMonoxideLevel');
	}

	updateCarbonMonoxideLevel(value) {
		this.updateValue('carbonMonoxideLevel', number(value));
	}
});
