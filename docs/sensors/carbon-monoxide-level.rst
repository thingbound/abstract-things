``cap:carbon-monoxide-leve`` - read carbon monoxide level
==========================================================

This capability is used to mark sensors that report their carbon monoxide level
as PPM (parts per million). The value is reported as a :doc:`number </values/number>`.

.. sourcecode:: js

	if(thing.matches('cap:carbon-monoxide-level')) {
		console.log('Carbon monoxide:', await thing.carbonMonoxideLevel());

		thing.on('carbonMonoxideLevelChanged', v => console.log('Changed to:', v));
	}

API
---

.. js:function:: carbonMonoxideLevel()

	Get the current carbon monoxide levels as PPM.

	:returns:
		Promise that resolves to the current value as a
		:doc:`number </values/number>`.

	.. sourcecode:: js

		console.log('CO is:', await thing.carbonMonoxideLevel());

.. js:function:: coLevel()

	Get the current carbon monoxide levels as PPM.

	:returns:
		Promise that resolves to the current value as a
		:doc:`number </values/number>`.

	.. sourcecode:: js

		console.log('CO is:', await thing.coLvel());

Events
------

.. js:data:: carbonMonoxideChanged

	The carbon monoxide level has changed. Payload is the new PPM as a
	:doc:`number </values/number>`.

	Example:

	.. sourcecode:: js

		thing.on('carbonMonoxideChanged', v => console.log('Changed to:', v));

Protected methods
-----------------

.. js:function:: updateCarbonMonoxideLevel(value)

	Update the current carbon monoxide level. Should be called whenever a change
	in PPM is detected.

	:param value:
		The new PPM value. Will be converted to a :doc:`number </values/number>`.

	Example:

	.. sourcecode:: js

		this.updateCarbonMonoxideLevel(0);

Implementing capability
-----------------------

Implementors of this capability should call ``updateCarbonMonoxideLevel``
whenever the PPM of carbon monoxide changes.

.. sourcecode:: js

	const { Sensor, CarbonMonoxideLevel } = require('abstract-things/sensors');

	class Example extends Sensor.with(CarbonMonoxideLevel) {

		constructor() {
			super();

			this.updateCarbonMonoxideLevel(0);
		}

	}
