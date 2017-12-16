'use strict';

const Thing = require('../thing');
const State = require('../state');
const { string } = require('../values');

/**
 * Power channels capability, for appliances that can monitor the state of
 * one or more power channels. This is used for things such as sockets and
 * power strips.
 */
module.exports = Thing.capability(Parent => class extends Parent.with(State) {
	static availableAPI(builder) {
		builder.state('power')
			.type('boolean')
			.description('If any channel has power')
			.done();

		builder.state('powerChannels')
			.type('object')
			.description('State of individual power channels')
			.done();

		builder.event('power')
			.type('boolean')
			.description('If the overall power state changes')
			.done();

		builder.event('powerChannel')
			.type('boolean')
			.description('If a specific power channel changes')
			.done();

		builder.action('power')
			.description('Get if any channel on this appliance has power')
			.argument('string', true, 'Optional name of channel to fetch')
			.returns('boolean', 'The power of the channel or appliance')
			.done();
	}

	static get capability() {
		return 'power-channels';
	}

	constructor(...args) {
		super(...args);

		this.updateState('power', false);
		this.updateState('powerChannels', {});
	}

	/**
	* Get the power state of this appliance.
	*
	* @returns
	*   boolean indicating the power level
	*/
	power(channel=undefined) {
		if(typeof channel === 'undefined') {
			return this.getState('power');
		} else {
			const channels = this.getState('powerChannels');
			return channels[string(channel)];
		}
	}

	/**
	 * Get the power channels of the appliance.
	 */
	get powerChannels() {
		return Object.keys(this.getState('powerChannels'));
	}

	/**
	* Update the state of a power channel of this appliance.
	*
	* @param {string} channel
	* @param {boolean} power
	*/
	updatePowerChannel(channel, power) {
		const channels = this.getState('powerChannels');

		const updated = Object.assign({}, channels);
		updated[channel] = power;

		if(this.updateState('powerChannels', updated)) {
			this.emitEvent('powerChannel', {
				channel: channel,
				power: power
			});

			if(this.getState('power') !== power) {
				// Overall state might have changed
				let hasPower = false;
				for(const key of Object.keys(updated)) {
					if(updated[key]) {
						hasPower = true;
						break;
					}
				}

				// Change the overall power state
				if(this.updateState('power', hasPower)) {
					this.emitEvent('power', power);
				}
			}
		}
	}

});
