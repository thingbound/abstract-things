'use strict';

const pickValue = require('./pickValue');

module.exports = function setValue(data, path, valueToSet) {

	let didSet = false;
	pickValue(data, path, ({ array, current, key, index, value, isLast }) => {
		// Get the initial value
		value = current[key];

		if(isLast) {
			didSet = true;
			value = valueToSet;
		} else if(typeof value === 'undefined') {
			if(array) {
				value = [];
			} else {
				value = {};
			}
		} else {
			return value;
		}

		// Set the value on the target object
		current[key] = value;
		return value;
	});

	return didSet;
};
