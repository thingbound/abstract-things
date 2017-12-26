'use strict';

const isDeepEqual = require('deep-equal');

const Thing = require('../thing');
const { number } = require('../values');

const colorTemperatureRange = Symbol('colorTemperatureRange');

/**
 * Marker for lights that supports setting temperature as the color.
 */
module.exports = Thing.mixin(Parent => class extends Parent {
	static get capability() {
		return 'color:temperature';
	}

	static availableAPI(builder) {
		builder.action('colorTemperatureRange')
			.description('Get the temperature range this light supports')
			.returns('object')
			.done();
	}

	get colorTemperatureRange() {
		const range = this[colorTemperatureRange];

		if(! range) {
			throw new Error('Temperature range has not been set');
		}

		return {
			min: range.min,
			max: range.max
		};
	}

	updateColorTemperatureRange(min, max) {
		min = number(min);
		max = number(max);

		if(min > max) {
			const temp = max;
			max = min;
			min = temp;
		}

		const range = { min, max };
		if(! isDeepEqual(this[colorTemperatureRange], range)) {
			this[colorTemperatureRange] = range;
			this.emitEvent('colorTemperatureRangeChanged', range);
		}
	}
});
