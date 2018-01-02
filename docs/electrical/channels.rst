``type:power-channel`` - Power channels
=======================================

Things marked with ``power-channel`` represent a single channel of power.
Power channels are usually virtual, such as individual power lines in a
:doc:`power switch <switches>`.

The :doc:`power </common/power>` and
:doc:`switchable-power </common/switchable-power>` capability is commonly used
with channels to support switch the power. Channels can also be
:doc:`sensors </sensors/index>` if they report
:doc:`power load </sensors/power-load>` or
:doc:`power consumption </sensors/power-consumed>`.

.. sourcecode:: js

	if(thing.matches('type:power-channel')) {
		// This is a power channel

		if(thing.matches('cap:switchable-power')) {
			// And it also supports power switching
			thing.turnOn()
				.then(...)
				.catch(...);
		}
	}

Implementing type
-----------------

.. sourcecode:: js

	const { PowerChannel } = require('abstract-things/electrical');

	class Example extends PowerChannel.with(...) {

	}
