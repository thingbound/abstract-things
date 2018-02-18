'use strict';

const parseNumber = require('./parseNumber');

/**
 * Number value type. Supports numbers and parsing numbers from strings.
 */
module.exports = {
	create(value) {
		return parseNumber(value);
	},

	is(value) {
		return typeof value === 'number';
	}
};
