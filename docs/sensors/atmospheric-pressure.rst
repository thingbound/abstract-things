``cap:atmospheric-pressure`` - read atmospheric pressure
=======================================================

This capability is used to mark sensors that report the atmospheric pressure.

.. sourcecode:: js

	if(thing.matches('cap:atmospheric-pressure')) {
		console.log('Atmospheric pressure:', await thing.atmosphericPressure());
	}

API
---

.. js:function:: atmosphericPressure()

	Get the current atmospheric pressure.

	:returns:
		Promise that resolves to the atmospheric pressure as a
		:doc:`pressure </values/pressure>`.

	Example:

	.. sourcecode:: js

		console.log('Atmospheric pressure:', await thing.atmosphericPressure());

Events
------

.. js:data:: atmosphericPressureChanged

	The atmospheric pressure has changed.

	Example:

	.. sourcecode:: js

		thing.on('atmosphericPressureChanged', value => console.log('Pressure changed to:', value));

Protected methods
-----------------

.. js:function:: updateAtmosphericPressure(value)

	Update the current atmospheric pressure. Should be called whenever a change
	in atmospheric pressure is detected.

	:param value: The new atmospheric pressure.

	Example:

	.. sourcecode:: js

		// Defaults to pascals
		this.updateAtmosphericPressure(101325);

		// pressure value can be used to use hPa (= millibar), bar, psi or mmHg
		const { pressure } = require('abstract-things/values');
		this.updateAtmosphericPressure(pressure(1, 'atm'));
		this.updateAtmosphericPressure(pressure(1013, 'hPa'));

Implementing capability
-----------------------

Implementors of this capability should call ``updateAtmosphericPressure``
whenever the atmospheric pressure changes.

.. sourcecode:: js

	const { Sensor, AtmosphericPressure } = require('abstract-things/sensors');

	class Example extends Sensor.with(AtmosphericPressure) {

		constructor() {
			super();

			this.updateAtmosphericPressure(101325);
		}

	}
