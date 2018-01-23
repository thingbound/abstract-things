``cap:illuminance`` - read illuminance
======================================

This capability is used to mark sensors that report
:doc:`illuminance </values/illuminance>`. This is commonly used for sensors
that read light levels.

.. sourcecode:: js

	if(thing.matches('cap:illuminance')) {
		console.log('Light level:', await thing.illuminance());
	}

API
---

.. js:function:: illuminance()

	Get the current :doc:`illuminance </values/illuminance>`.

	:returns:
		Promise that resolves to the current
		:doc:`illuminance </values/illuminance>`.

	Example:

	.. sourcecode:: js

		const lightLevel = await thing.illuminance();
		console.log('Light level:', lightLevel.lux);

Events
------

.. js:data:: illuminanceChanged

	The illuminance has changed. Payload is the new :doc:`illuminance </values/illuminance>`.

	Example:

	.. sourcecode:: js

		thing.on('illuminanceChanged', v => console.log('Changed to:', v));

Protected methods
-----------------

.. js:function:: updateIlluminance(value)

	Update the current illuminance level. Should be called whenever a change in
	is detected.

	:param value:
		The new illuminance. Will be converted to
		:doc:`illuminance </values/illuminance>`, the default conversion uses
		lux.

	Example:

	.. sourcecode:: js

		this.updateIlluminance(20);

Implementing capability
-----------------------

Implementors of this capability should call ``updateIlluminance`` whenever the
detected light level changes.

.. sourcecode:: js

	const { Sensor, Illuminance } = require('abstract-things/sensors');

	class Example extends Sensor.with(Illuminance) {

		constructor() {
			super();

			this.updateIlluminance(10);
		}

	}
