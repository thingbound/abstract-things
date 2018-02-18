'use strict';

const parseNumber = require('./parseNumber');

/**
 * Percentage type. Supports numbers and strings that may end with %.
 */
module.exports = {
	create(value, options) {
		if(typeof value === 'string') {
			value = value.trim();

			if(value.endsWith('%')) {
				// Cut off % at the end
				value = value.substring(0, value.length - 1);
			}

			value = parseNumber(value);
		} else if(typeof value !== 'number') {
			throw new Error('Can not translate to a percentage');
		}

		if(typeof options !== 'undefined') {
			const min = options.min;
			if(typeof min !== 'undefined') {
				if(value < min) {
					value = min;
				}
			}

			const max = options.max;
			if(typeof max !== 'undefined') {
				if(value > max) {
					value = max;
				}
			}

			const precision = options.precision;
			if(typeof precision !== 'undefined') {
				const p = Math.pow(10, precision);
				value = Math.round(value * p) / p;
			}
		}

		return value;
	},

	comparable: true
};
