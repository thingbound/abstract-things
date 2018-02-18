'use strict';

/**
 * Boolean value type. Parses some basic strings.
 */
module.exports = {
	create(value) {
		if(typeof value === 'boolean') return value;

		value = String(value).toLowerCase();
		switch(value) {
			case 'true':
			case 'yes':
			case 'on':
			case '1':
				return true;
			case 'false':
			case 'no':
			case 'off':
			case '0':
				return false;
			default:
				throw new Error('Can not translate `' + value + '` into a boolean');
		}
	},

	is(value) {
		return typeof value === 'boolean';
	}
};
