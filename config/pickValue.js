'use strict';

const parsePath = require('./parsePath');

module.exports = function(data, path, callback=undefined) {
	// No path or empty path, return everything
	if(! path || path === '') return data;

	// No data always maps to nothing
	if(typeof data === 'undefined') undefined;

	const parts = parsePath(path);

	let current = data;
	let currentPath = '';
	for(let i=0; i<parts.length; i++) {
		const part = parts[i];
		const isLast = i === parts.length - 1;

		if(typeof current[part] === 'undefined') {
			if(callback) {
				// No data but a callback exists, ask it to create it
				current = callback({
					current: current,
					key: part,
					array: typeof part === 'number',
					isLast: isLast
				});
			} else {
				return undefined;
			}
		} else {
			if(callback) {
				// Invoke the callback to resolve an item
				current = callback({
					current: current,
					key: part,
					isLast: isLast
				});
			} else {
				current = current[part];
			}
		}

		if(currentPath.length > 0) {
			currentPath += '.';
		}
		currentPath += part;

		if(typeof current === 'undefined' || current === null) {
			// Undefined means that the callback mapped to nothing, return
			return undefined;
		}
	}

	return current;
};
