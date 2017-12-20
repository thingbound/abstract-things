``power-channels`` - monitor multiple power channels
=====================================================

``power-channels`` is a capability for monitoring one or more channels that
have a power state. This is intended for things such as power outlets or
power strips that can monitor (and sometimes control) the state of another
thing.

.. sourcecode:: js

	if(thing.matches('cap:power-channels')) {
		console.log('Channels are:', thing.powerChannels);
		console.log('Power is', thing.power());
	}

Related capabilities: :doc:`switchable-power-channels <switchable-power-channels>`, :doc:`state <state>`

API
---

.. js:attribute:: powerChannels

	Get the power channels that this thing supports. Returns an array with
	names of channels as strings.

	Example:

	.. sourcecode:: js

		console.log(thing.powerChannels);
		console.log('First channel is', thing.powerChannels[0]);

.. js:function:: power([channel])

	Get if any channel or a specific channel is powered on. If a channel is
	specified the power state of that channel will be returned.

	:param string channel: The optional channel to get the power state for.
	:returns: Boolean indicating the power state.

	Example:

	.. sourcecode:: js

		console.log('Any channel has power:', thing.power());
		console.log('Channel 0 has power:', thing.power('0'));

.. js:attribute:: state.power

	State-key indicating if any channel is powered on.

	Example:

	.. sourcecode:: js

		console.log(thing.state.power);

.. js:attribute:: state.powerChannels

	State-key indicating the power state of individual channels.

	Example:

	.. sourcecode:: js

		console.log(thing.state.powerChannels);
		console.log(thing.state.powerChannels['name']);

Events
------

.. describe:: power

	The current power state has changed. Will be ``true`` if any channel is
	powered on.

	.. sourcecode:: js

		thing.on('power', power => console.log('power is now:', power));

.. describe:: powerChannel

	The power state of a channel has changed.

	.. sourcecode:: js

		thing.on('powerChannel', change =>
			console.log('Channel', change.channel, 'now has power', change.power)
		);

Protected methods
-----------------

.. js:function:: updatePowerChannel(channel, power)

	Update current power state of the given channel.

	:param string channel: The channel to update.
	:param boolean power: The current power state.

	Example:

	.. sourcecode:: js

		this.updatePowerChannel('0', true);

Implementing capability
-----------------------

This capability should take care to set the state of power channels as early
as possible. The available channels are based on the ones being used.

Example:

.. sourcecode:: js

	const { Thing, PowerChannels } = require('abstract-things');

	class Example extends Thing.with(PowerChannels) {
		constructor() {
			super();

			// Set the initial power state of channels
			this.updatePowerChannel('main', false);
			this.updatePowerChannel('usb', false);

			// Update them at any time with updatePowerChannel
		}
	}
