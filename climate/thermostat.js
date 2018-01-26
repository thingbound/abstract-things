'use strict';

const Thing = require('../thing');

/**
 * Type for marking a thing as a thermostat.
 */
module.exports = Thing.type(Parent => class extends Parent {
	static get type() {
		return 'thermostat';
	}
});
