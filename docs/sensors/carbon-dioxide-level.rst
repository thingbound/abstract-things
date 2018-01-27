``cap:carbon-dioxide-level`` - read carbon dioxide level
========================================================

This capability is used to mark sensors that report their carbon dioxide level
as PPM (parts per million). The value is reported as a :doc:`number </values/number>`.

.. sourcecode:: js

	if(thing.matches('cap:carbon-dioxide-level')) {
		console.log('Carbon dioxide:', await thing.carbonDioxideLevel());

		thing.on('carbonDioxideLevelChanged', v => console.log('Changed to:', v));
	}

API
---

.. js:function:: carbonDioxideLevel()

	Get the current carbon dioxide levels as PPM.

	:returns:
		Promise that resolves to the current value as a
		:doc:`number </values/number>`.

	Example:

	.. sourcecode:: js

		console.log('CO2 is:', await thing.carbonDioxideLevel());

.. js:function:: co2Level()

	Get the current carbon dioxide levels as PPM. Reported as a
	:doc:`number </values/number>`.

	:returns:
		Promise that resolves to the current value as a
		:doc:`number </values/number>`.

	Example:

	.. sourcecode:: js

		console.log('CO2 is:', await thing.co2Level());

Events
------

.. js:data:: carbonDioxideLevelChanged

	The carbon dioxide level has changed. Payload is the new PPM as a
	:doc:`number </values/number>`.

	Example:

	.. sourcecode:: js

		thing.on('carbonDioxideLevelChanged', v => console.log('Changed to:', v));

Protected methods
-----------------

.. js:function:: updateCarbonDioxideLevel(value)

	Update the current carbon dioxide level. Should be called whenever a change
	in PPM is detected.

	:param value:
		The new PPM value. Will be converted to a :doc:`number </values/number>`.

	Example:

	.. sourcecode:: js

		this.updateCarbonDioxideLevel(389);

Implementing capability
-----------------------

Implementors of this capability should call ``updateCarbonDioxideLevel``
whenever the PPM of carbon dioxide changes.

.. sourcecode:: js

	const { Sensor, CarbonDioxideLevel } = require('abstract-things/sensors');

	class Example extends Sensor.with(CarbonDioxideLevel) {

		constructor() {
			super();

			this.updateCarbonDioxideLevel(390);
		}

	}
