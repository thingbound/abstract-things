'use strict';

const pickValue = require('./pickValue');

module.exports = function findGroup(data, path, create=false) {

	let previous = data;
	return pickValue(data, path, ({ array, current, key, index, isLast }) => {
		if(isLast) {
			return previous;
		}

		let value = current.get(key);
		if(typeof value === 'undefined') {
			return undefined;
		} else {
			previous = value;
			return value;
		}
	});

};
