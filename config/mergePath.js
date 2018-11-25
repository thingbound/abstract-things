'use strict';

/**
 * Merge a path in the same format as used by parsePath.
 */
module.exports = function(...args) {
	let result = '';
	for(let arg of args) {
		if(typeof arg === 'number') {
			result += '[' + arg + ']';
		} else {
			if(result.length > 0) {
				result += '.';
			}

			result += arg;
		}
	}

	return result;
};
