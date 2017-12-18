'use strict';

const Thing = require('../thing');
const PowerChannels = require('./power-channels');
const RestorableState = require('./restorable-state');
const { string, boolean } = require('../values');


/**
 * Power channels capability, for appliances that can monitor the state of
 * one or more power channels. This is used for things such as sockets and
 * power strips.
 */
module.exports = Thing.capability(Parent => class extends Parent.with(PowerChannels, RestorableState) {
	static availableAPI(builder) {
		builder.action('power')
			.description('Get if any channel on this appliance has power')
			.argument('string', true, 'Optional name of channel to fetch')
			.argument('boolean', true, 'Optional power state')
			.returns('boolean', 'The power of the channel or appliance')
			.done();
	}

	/**
	* Get that this provides the power capability.
	*/
	static get capability() {
		return 'switchable-power-channels';
	}

	constructor(...args) {
		super(...args);
	}

	power(channel=undefined, power=undefined) {
		// Switch around arguments so power(boolean) works
		if(typeof power === 'undefined') {
			if(typeof channel === 'boolean') {
				channel = undefined;
				power = channel;
			}
		}

		if(typeof power === 'undefined') {
			// Simply getting the state
			return super.power(channel);
		} else {
			channel = string(channel);
			power = boolean(power);
			if(typeof channel === 'undefined') {
				// Switching the power of all channels
				const channels = Object.keys(this.getState('powerChannels'));

				return Promise.all(
					channels.map(channel => Promise.resolve(this.changePowerChannel(channel, power)))
				).then(() => this.getState('power'));
			} else {
				return Promise.resolve(this.changePowerChannel(channel, power))
					.then(() => super.power(channel));
			}
		}
	}

	changePowerChannel(channel, power) {
		throw new Error('changePowerChannel is not implemented');
	}

	get restorableState() {
		return [ ...super.restorableState, 'powerChannels' ];
	}

	changeState(state) {
		return super.changeState(state)
			.then(() => {
				if(typeof state.powerChannels !== 'undefined') {
					const channels = Object.keys(this.getState('powerChannels'));
					return Promise.all(
						channels.map(channel => Promise.resolve(
							this.changePowerChannel(channel, state.powerChannels[channel]))
						)
					);
				}
			});
	}
});
