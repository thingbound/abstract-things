``cap:switchable-power-channels`` - switch multiple power channels
==================================================================

``switchable-power-channels`` is an extension to :doc:`power-channels <power-channels>`
for things that can also switch the power state of their channels.

.. sourcecode:: js

	if(thing.matches('cap:switchable-power-channels')) {
		console.log('Channels are:', thing.powerChannels);
		console.log('Power is', thing.power());

		// Switch a power channel on
		thing.power('main', true)
			.then(() => console.log('Power is now on'))
			.catch(err => console.log('Failed to switch power', err));
	}

Related capabilities: :doc:`power-channels <power-channels>`

API
---

.. js:function:: power([channel], [powerState])

	Get or set the current power state, either for any channel or for a
	specific channel. If ``powerState`` is specified this method will attempt
	to switch the state of either a specific channel or all channels.

	:param string channel: Optional channel to get or change power state for.
	:param boolean powerState: Optional :doc:`boolean </values/boolean>` to change power state to.
	:returns: Promise when switching state, boolean if getting.

	Example:

	.. sourcecode:: js

		// Getting any channel returns a boolean
		const powerIsOn = thing.power();
		// Getting a specific channel also returns a boolean
		const channelIsOn = thing.power('main');

		// Switching a specific channel returns a promise
		thing.power('main', false)
			.then(result => console.log('Power is now', result))
			.catch(err => console.log('Error occurred', err);

		// Switch the power of all channels
		thing.power(false)
			.then(...)
			.catch(...);

Protected methods
-----------------

.. js:function:: changePowerChannel(channel, power)

	*Abstract*. Change the power state of the specified channel. Called
	whenever a power change is requested. Implementations should call
	``updatePowerChannel`` before resolving to indicate that a change has
	occurred.

	Can be called with the same state as is currently set for the channel. When
	changing multiple power state this method will be called multiple times.

	:param string channel: The channel to change power for.
	:param boolean power: The new power state of the channel as a :doc:`boolean </values/boolean>`.
	:returns: Promise if asynchronous.

Implementing capability
-----------------------

In addition to the requirements specified by :doc:`power-channels <power-channels>`
this capability requires that ``changePowerChannel`` is implemented.

Example:

.. sourcecode:: js

	const { Thing, SwitchablePowerChannels } = require('abstract-things');

	class Example extends Thing.with(SwitchablePowerChannels) {
		constructor() {
			super();

			// Set the initial power state of channels
			this.updatePowerChannel('main', false);
			this.updatePowerChannel('usb', false);
		}

		changePowerChannel(channel, power) {
			/*
			 * This method is called whenever a power change for a channel is
			 * requested.
			 *
			 * Change the power here and return a Promise if the method is
			 * asynchronous. The switch should also call updatePowerChannel
			 * with the new power state.
			 */
			 return switchWithPromise(channel, power)
			 	.then(() => this.updatePowerChannel(channel, power));
		}
	}
