'use strict';

function getNonQuoted(path, start, end) {
	if(path.charAt(start) === '"') start += 1;
	if(path.charAt(end - 1) === '"') end -= 1;

	return path.substring(start, end);
}

/**
 * Parse a dot-separated path into its parts. Supports quoting individual
 * key and array indexes.
 *
 * @param {string} path
 *   The path to parse
 */
module.exports = function parsePath(path) {
	if(typeof path !== 'string') {
		throw new Error('Path needs to be specified as a string');
	}

	let parts = [];

	let quoted = false;
	let lastIndex = 0;
	let targetChar = '.';

	function push(i) {
		// Make sure that only non-empty parts are added
		if(lastIndex === i) {
			// Also make sure that we indicate that the trigger char has been consumed
			lastIndex++;
			return;
		}

		// Get the non-quoted path
		const str = getNonQuoted(path, lastIndex, i);

		// Update the last index to be after this push
		lastIndex = i + 1;

		if(targetChar === ']') {
			parts.push(parseInt(str));
		} else {
			parts.push(str);
		}
	}

	for(let i=0; i<path.length; i++) {
		const c = path.charAt(i);
		if(! quoted) {
			if(c === targetChar) {
				push(i);

				// Restore to a dot target
				targetChar = '.';
			} else if(c === '[') {
				// Start of a list entry
				push(i);

				// Set that we are looking for the end bracket
				targetChar = ']';
			}
		}

		if(c === '"') {
			quoted = ! quoted;
		}
	}

	// Include the last part
	push(path.length);
	return parts;
};
