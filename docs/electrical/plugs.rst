``type:power-plug`` - Power plugs
=================================

Things marked with ``power-plug`` are plugs that can be plugged in to an outlet.
Most plugs are also :doc:`power outlets <outlets>` in that appliances can be
plugged in to them.

The :doc:`power </common/power>` and
:doc:`switchable-power </common/switchable-power>` capability is commonly used
with plugs to switch the power of the outlet of the plug. They can also be
:doc:`sensors </sensors/index>` if they report
:doc:`power load </sensors/power-load>` or
:doc:`power consumption </sensors/power-consumed>`.

.. sourcecode:: js

	if(thing.matches('type:power-plug')) {
		// This is a power plug

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

	const { PowerPlug, PowerOutlet } = require('abstract-things/electrical');

	class Example extends PowerPlug.with(PowerOutlet, ...) {

	}
