``cap:temperature`` - read temperature
======================================

This capability is used to mark sensors that report a :doc:`temperature </values/temperature>`.

.. sourcecode:: js

	if(thing.matches('cap:temperature')) {
		console.log('Temperature:', thing.temperature);
	}

API
---

.. js:attribute:: temperature

	Get the current :doc:`temperature </values/temperature>`.

	.. sourcecode:: js

		console.log('Temperature is:', thing.temperature);

Events
------

.. js:data:: temperatureChanged

	The temperature has changed. Payload is the new :doc:`temperature </values/temperature>`.

	.. sourcecode:: js

		thing.on('temperatureChanged', temp => console.log('Temp changed to:', temp));

Protected methods
-----------------

.. js:function:: updateTemperature(value)

	Update the current temperature. Should be called whenever a change in
	temperature was detected.

	:param value:
		The new temperature. Will be converted to a
		:doc:`temperature </values/temperature>`, the default conversion uses
		degrees Celsius.

	Example:

	.. sourcecode:: js

		// Defaults to Celsius
		this.updateTemperature(20);

		// temperature value can be used to use Fahrenheit (or Kelvin)
		const { temperature } = require('abstract-things/values');
		this.updateTemperature(temperature(45, 'F'));

Implementing capability
-----------------------

Implementors of this capability should call ``updateTemperature`` whenever the
temperature changes.

.. sourcecode:: js

	const { Sensor, Temperature } = require('abstract-things/sensors');

	class Example extends Sensor.with(Temperature) {

		constructor() {
			super();

			this.updateTemperature(22);
		}

	}
