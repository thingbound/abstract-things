'use strict';

/**
 * String type. Tries to convert everything to a string.
 */
module.exports = {
	create(value) {
		return String(value);
	},

	is(value) {
		return typeof value === 'string';
	}
};
