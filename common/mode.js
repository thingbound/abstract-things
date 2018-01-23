'use strict';

const Thing = require('../thing');
const State = require('./state');

/**
 * Mode capability, for appliances that support different modes.
 */
module.exports = Thing.mixin(Parent => class extends Parent.with(State) {
	/**
	* Define the API of appliances that can manage their power.
	*/
	static availableAPI(builder) {
		builder.state('mode')
			.type('string')
			.description('The current mode of this appliance')
			.done();

		builder.state('modes')
			.type('array')
			.description('The available modes of this appliance')
			.done();

		builder.event('modeChanged')
			.type('string')
			.description('The mode of the appliance has changed')
			.done();

		builder.event('modesChanged')
			.type('array')
			.description('The availables modes of the appliance have changed')
			.done();

		builder.action('mode')
			.description('Get the mode of this appliance')
			.returns('mode', 'The mode of the appliance')
			.getterForState('mode')
			.done();

		builder.action('modes')
			.description('Get the available modes')
			.returns('array', 'The modes that are supported')
			.getterForState('modes')
			.done();
	}

	/**
	* Get that this provides the mode capability.
	*/
	static get capability() {
		return 'mode';
	}

	constructor(...args) {
		super(...args);

		this.updateState('mode', null);
		this.updateState('modes', []);
	}

	/**
	* Get or switch the mode of the appliance.
	*
	* @returns
	*   string indicating the mode
	*/
	mode() {
		return Promise.resolve(this.getState('mode'));
	}

	/**
	* Update the mode of the appliance. Will emit events.
	*
	* @param {string} mode
	*/
	updateMode(mode) {
		if(this.updateState('mode', mode)) {
			this.emitEvent('modeChanged', mode);
		}
	}

	/**
	 * Get the available modes of the device.
	 */
	modes() {
		return Promise.resolve(this.getState('modes'));
	}

	/**
	 * Get the available modes of the device.
	 */
	updateModes(modes) {
		if(this.updateState('modes', modes)) {
			this.emitEvent('modesChanged', modes);
		}
	}
});
