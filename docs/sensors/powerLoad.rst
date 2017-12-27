``power-load`` - read the current power load
============================================

This capability is used to mark sensors that report power load, that is the
:doc:`power </values/power>` currently being used.

.. sourcecode:: js

	if(thing.matches('cap:power-load')) {
		console.log('Power load:', thing.powerLoad.watts);
	}

API
---

.. js:attribute:: powerLoad

	Get the current amount of power used, reports values as
	:doc:`power </values/power>`.

	.. sourcecode:: js

		console.log('Power load:', thing.powerLoad.watts);

Events
------

.. js:data:: powerLoadChanged

	The amount of power being used has changed. Payload is the power load
	as :doc:`power </values/power>`.

	.. sourcecode:: js

		thing.on('powerLoadChanged', v => console.log('Changed to:', v));

Protected methods
-----------------

.. js:function:: updatePowerLoad(value)

	Update the power load. Should be called whenever a change is detected.

	:param value:
		The new amount of power being used, as :doc:`power </values/power>`.
		The default unit is watts.

	Example:

	.. sourcecode:: js

		this.updatePowerLoad(5);

Implementing capability
-----------------------

Implementors of this capability should call ``updatePowerLoad`` whenever
the power load changes.

.. sourcecode:: js

	const { Sensor, PowerLoad } = require('abstract-things/sensors');

	class Example extends Sensor.with(PowerLoad) {

		constructor() {
			super();

			this.updatePowerLoad(10);
		}

	}
