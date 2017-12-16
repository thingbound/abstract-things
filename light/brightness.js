'use strict';

const Thing = require('../thing');
const State = require('../state');

module.exports = Thing.capability(Parent => class extends Parent.with(State) {
	/**
	 * Expose the brightness API.
	 */
	static availableAPI(builder) {
		builder.state('brightness')
			.type('percentage')
			.description('The brightness of this light')
			.done();

		builder.event('brightness')
			.type('percentage')
			.description('The brightness of the light has changed')
			.done();

		builder.action('brightness')
			.description('Get or set the brightness of this light')
			.argument('change:brightness', true, 'The change in brightness or absolute brightness')
			.returns('percentage', 'The brightness of the light')
			.getterForState('brightness')
			.done();
	}

	/**
	 * Mark the light as dimmable.
	 */
	static get capabilities() {
		return [ 'brightness' ];
	}

	/**
	 * Get or change the brightness of this light.
	 */
	brightness() {
		return this.getState('brightness', 0);
	}

	/**
	 * Update the current brightness value, such as from a call to `changeBrightness` or
	 * if the value has been changed externally.
	 *
	 * @param {*} brightness
	 */
	updateBrightness(brightness) {
		if(this.updateState('brightness', brightness)) {
			this.emitEvent('brightness', brightness);
		}
	}
});
