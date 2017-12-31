``cap:color:temperature`` - light supports temperature
======================================================

Capability used to mark lights that support setting color temperature natively.

.. sourcecode:: js

	if(thing.matches('cap:color:temperature')) {
		console.log('Range is', thing.colorTemperatureRange);
	}

API
---

.. js:attribute:: colorTemperatureRange

	Get the range of temperatures this color supports.

	:returns: Object with ``min`` and ``max`` in Kelvin.

	Example:

	.. sourcecode:: js

		console.log('Min temperature:', thing.colorTemperatureRange.min);
		console.log('Max temperature:', thing.colorTemperatureRange.max);

Events
------

.. js:data:: colorTemperatureRangeChanged

	The range of temperature the light supports has changed.

	.. sourcecode:: js

		thing.on('colorTemperatureRangeChanged', range => console.log('Range is now', range));

Protected methods
-----------------

.. js:function:: updateColorTemperatureRange(min, max)

	Set the color temperature range the light support.

	:param number min: The minimum color temperature in Kelvin.
	:param number max: The maximum color temperature in Kelvin.

Implementing capability
-----------------------

Implementors of this capability should call ``setColorTemperatureRange``
either in the constructor or ``initCallback``.

Example:

	.. sourcecode:: js

		const { Light, ColorTemperature } = require('abstract-things/lights');

		class Example extends Light.with(ColorTemperature) {

			constructor() {
				super();

				this.updateColorTemperatureRange(2000, 5000);
			}

		}
