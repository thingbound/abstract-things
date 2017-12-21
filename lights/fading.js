'use strict';

const Thing = require('../thing');

/**
 * Marker for lights that support fading effects for dimming and color
 * changing.
 */
module.exports = Thing.mixin(Parent => class extends Parent {
	static get capability() {
		return 'fading';
	}
});
