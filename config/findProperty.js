'use strict';

const pickValue = require('./pickValue');

module.exports = function findProperty(data, path) {
	let previous = data;
	return pickValue(data, path, ({ key, value, isLast }) => {
		// The property is not findable due to missing group
		if(! previous || ! previous.get) return undefined;

		const result = previous.get(key);
		previous = result;
		return result;
	});

};
