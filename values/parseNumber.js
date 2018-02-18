'use strict';

const amounts = require('amounts');

/**
 * Parse a string into a number using the generic amount. This allows the same
 * format of numbers with generic SI-suffixes as used in most other value
 * types.
 */
module.exports = function parseNumber(v) {
	if(typeof v === 'number') return v;
	if(typeof v !== 'string') {
		throw new Error('Can not convert into a number, string is needed');
	}

	try {
		return amounts.amount(v).value;
	} catch(ex) {
		throw new Error('Could not convert into a number, invalid format for string: ' + v);
	}
};
