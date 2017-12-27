``relative-humidity`` - read humidity of air
============================================

This capability is used to mark sensors that report the relative humidity of
the air.

.. sourcecode:: js

	if(thing.matches('cap:relative-humidity')) {
		console.log('RH:', thing.relativeHumidity);
	}

API
---

.. js:attribute:: relativeHumidity

	Get the current relative humidity as a :doc:`percentage </values/percentage>`.

	.. sourcecode:: js

		console.log('RH:', thing.relativeHumidity);


.. js:attribute:: rh

	Get the current relative humidity as a :doc:`percentage </values/percentage>`.

	.. sourcecode:: js

		console.log('RH:', thing.rh);

Events
------

.. js:data:: relativeHumidityChanged

	The relative humidity has changed. Payload is the new humidity as a
	:doc:`percentage </values/percentage>`.

	.. sourcecode:: js

		thing.on('relativeHumidityChanged', v => console.log('Changed to:', v));

Protected methods
-----------------

.. js:function:: updateRelativeHumidity(value)

	Update the relative humidity. Should be called whenever a change is detected.

	:param value:
		The new relative humidity. Will be converted to a
		:doc:`percentage </values/percentage>`.

	Example:

	.. sourcecode:: js

		this.updateRelativeHumidity(32);

Implementing capability
-----------------------

Implementors of this capability should call ``updateRelativeHumidity`` whenever
the relative humidity changes.

.. sourcecode:: js

	const { Sensor, RelativeHumidity } = require('abstract-things/sensors');

	class Example extends Sensor.with(RelativeHumidity) {

		constructor() {
			super();

			this.updateRelativeHumidity(56);
		}

	}
