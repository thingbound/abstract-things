``voltage`` - read voltage of something
=======================================

This capability is used to mark sensors that report the
:doc:`voltage </values/voltage>` of something.

.. sourcecode:: js

	if(thing.matches('cap:voltage')) {
		console.log('Voltage:', thing.voltage.volts);
	}

API
---

.. js:attribute:: voltage

	Get the current :doc:`voltage </values/voltage>`.

	.. sourcecode:: js

		console.log('Voltage:', thing.voltage.volts);

Events
------

.. js:data:: voltageChanged

	The voltage has changed. Payload is the new voltage as a
	:doc:`voltage </values/voltage>`.

	.. sourcecode:: js

		thing.on('voltageChanged', v => console.log('Changed to:', v));

Protected methods
-----------------

.. js:function:: updateVoltage(value)

	Update the :doc:`voltage </values/voltage>`. Should be called whenever a
	change is detected.

	:param value:
		The new voltage. Will be converted to a :doc:`voltage </values/voltage>`
		with the default unit being volts.

	Example:

	.. sourcecode:: js

		this.updateVoltage(12);

Implementing capability
-----------------------

Implementors of this capability should call ``updateRelativeHumidity`` whenever
the relative humidity changes.

.. sourcecode:: js

	const { Sensor, Voltage } = require('abstract-things/sensors');

	class Example extends Sensor.with(Voltage) {

		constructor() {
			super();

			this.updateVoltage(230);
		}

	}
