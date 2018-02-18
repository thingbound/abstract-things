'use strict';

/**
 * Buffer type. Handles Base64 encoded strings and direct instances.
 *
 * TODO: Support for Uint8Array
 */
module.exports = {
	create(value) {
		if(value instanceof Buffer) {
			return value;
		}

		if(Array.isArray(value)) {
			// Assume this is an array with octets
			return Buffer.from(value);
		} else if(typeof value === 'object') {
			value = value.encoded;
		}

		if(typeof value === 'string') {
			// Assume this is Base-64 encoded string
			return Buffer.from(value, 'base64');
		} else {
			throw new Error('Can not create buffer from value');
		}
	},

	is(value) {
		return value instanceof Buffer;
	},

	toJSON(value) {
		return {
			encoded: value.toString('base64')
		};
	}
};
