'use strict';

const Thing = require('../thing');

/**
 * Marker for lights that supports setting temperature as the color.
 */
module.exports = Thing.mixin(Parent => class extends Parent {
	static get capability() {
		return 'color:temperature';
	}
});
