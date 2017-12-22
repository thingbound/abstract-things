'use strict';

const Thing = require('../thing');
const { duration } = require('../values');

const maxChangeTime = Symbol('maxChangeTime');

/**
 * Marker for lights that support fading effects for dimming and color
 * changing.
 */
module.exports = Thing.mixin(Parent => class extends Parent {
	static get capability() {
		return 'fading';
	}

	get maxChangeTime() {
		return this[maxChangeTime];
	}

	set maxChangeTime(t) {
		this[maxChangeTime] = duration(t);
	}
});
