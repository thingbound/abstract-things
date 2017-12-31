``cap:carbon-dioxide`` - read carbon dioxide level
==================================================

This capability is used to mark sensors that report their carbon dioxide level
as PPM (parts per million). The value is reported as a :doc:`number </values/number>`.

.. sourcecode:: js

	if(thing.matches('cap:carbon-dioxide')) {
		console.log('Carbon dioxide:', thing.carbonDioxide);
	}

API
---

.. js:attribute:: carbonDioxide

	Get the current carbon dioxide levels as PPM. Reported as a
	:doc:`number </values/number>`.

	.. sourcecode:: js

		console.log('CO2 is:', thing.carbonDioxide);

.. js:attribute:: co2

	Get the current carbon dioxide levels as PPM. Reported as a
	:doc:`number </values/number>`.

	.. sourcecode:: js

		console.log('CO2 is:', thing.co2);

Events
------

.. js:data:: carbonDioxideChanged

	The carbon dioxide level has changed. Payload is the new PPM as a
	:doc:`number </values/number>`.

	.. sourcecode:: js

		thing.on('carbonDioxideChanged', v => console.log('Changed to:', v));

Protected methods
-----------------

.. js:function:: updateCarbonDioxide(value)

	Update the current carbon dioxide level. Should be called whenever a change
	in PPM is detected.

	:param value:
		The new PPM value. Will be converted to a :doc:`number </values/number>`.

	Example:

	.. sourcecode:: js

		this.updateCarbonDioxide(389);

Implementing capability
-----------------------

Implementors of this capability should call ``updateCarbonDioxide`` whenever the
PPM of carbon dioxide changes.

.. sourcecode:: js

	const { Sensor, CarbonDioxide } = require('abstract-things/sensors');

	class Example extends Sensor.with(CarbonDioxide) {

		constructor() {
			super();

			this.updateCarbonDioxide(390);
		}

	}
