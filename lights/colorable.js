'use strict';

const Thing = require('../thing');
const Light = require('./light');
const LightState = require('./light-state');
const { duration, color } = require('../values');

module.exports = Thing.mixin(Parent => class extends Parent.with(LightState) {
	/**
	 * Expose the color methods.
	 */
	static availableAPI(builder) {
		builder.state('color')
			.type('color')
			.description('The color of the light')
			.done();

		builder.action('color')
			.description('Get or set the color of this light')
			.argument('color', true, 'Optional color to set')
			.returns('color', 'The color of the light')
			.getterForState('color')
			.done();

		builder.action('setColor')
			.description('Set the color of this light')
			.argument('color', false, 'The color to set')
			.returns('color', 'The color of the light')
			.done();

		builder.event('colorChanged')
			.type('color')
			.description('The color of the light has changed')
			.done();
	}

	/**
	 * Mark the light as dimmable.
	 */
	static get capabilities() {
		return [ 'colorable' ];
	}

	/**
	 * Get or change the brightness of this light.
	 */
	color(color, duration=Light.DURATION) {
		if(color) {
			return this.setColor(color, duration);
		}

		return this.getState('color');
	}

	setColor(color0, duration0=Light.DURATION) {
		if(typeof color0 === 'undefined') throw new Error('Color must be specified');
		color0 = color(color0);
		duration0 = duration(duration0);

		return Promise.resolve(this.changeColor(color0, duration0))
			.then(() => this.getState('color'));
	}

	updateColor(color) {
		if(this.updateState('color', color)) {
			this.emitEvent('colorChanged', color);
		}
	}

	changeColor(color, duration) {
		throw new Error('changeColor not implemented');
	}

	get restorableState() {
		return [ ...super.restorableState, 'color' ];
	}

	setLightState(state) {
		return super.setLightState(state)
			.then(() => {
				if(typeof state.color !== 'undefined') {
					return this.changeColor(state.color, Light.DURATION);
				}
			});
	}

	mapLightState(state) {
		super.mapLightState(state);

		if(typeof state.color !== 'undefined') {
			state.color = color(state.color);
		}
	}
});
