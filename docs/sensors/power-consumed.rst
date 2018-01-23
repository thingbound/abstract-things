``cap:power-consumed`` - read power consumed
============================================

This capability is used to mark sensors that report power consumed by something.

.. sourcecode:: js

	if(thing.matches('cap:power-consumed')) {
		const powerConsumed = await thing.powerConsumed();
		console.log('Power consumed:', powerConsumed.wattHours);
	}

API
---

.. js:function:: powerConsumed

	Get the current amount of power consumed.
	.

	:returns:
		Promise that resolves to the amount of power consumed as
		:doc:`energy </values/energy>`.

	Example:

	.. sourcecode:: js

		const powerConsumed = await thing.powerConsumed();
		console.log('Power consumed:', powerConsumed.wattHours);

Events
------

.. js:data:: powerConsumedChanged

	The amount of power consumed has changed. Payload is the power consumed
	as :doc:`energy </values/energy>`.

	Example:

	.. sourcecode:: js

		thing.on('powerConsumedChanged', v => console.log('Changed to:', v));

Protected methods
-----------------

.. js:function:: updatePowerConsumed(value)

	Update the power consumed. Should be called whenever a change is detected.

	:param value:
		The new amount of power consumed, as :doc:`energy </values/energy>`.
		The default unit is joules.

	Example:

	.. sourcecode:: js

		const { energy } = require('abstract-things/values');
		this.updatePowerConsumed(energy(0.5, 'wh'));

Implementing capability
-----------------------

Implementors of this capability should call ``updatePowerConsumed`` whenever
the power consumed changes.

.. sourcecode:: js

	const { Sensor, PowerConsumed } = require('abstract-things/sensors');

	class Example extends Sensor.with(PowerConsumed) {

		constructor() {
			super();

			this.updatePowerConsumed(10); // Joules
		}

	}
