'use strict';

const pickValue = require('./pickValue');
const setValue = require('./setValue');

module.exports = class ConfigData {

	constructor() {
		this.object = {};
	}

	/**
	 * Get the value of the given string.
	 *
	 * @param {string} key
	 */
	get(key) {
		return pickValue(this.object, key);
	}

	/**
	 * Set the value of the given key.
	 */
	set(key, value) {
		return setValue(this.object, key, value);
	}

	/**
	 * Get the config data as a plain object.
	 */
	asPlainObject() {
		return this.object;
	}
};
