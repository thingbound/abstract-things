``cap:carbon-monoxide`` - read carbon monoxide level
====================================================

This capability is used to mark sensors that report their carbon monoxide level
as PPM (parts per million). The value is reported as a :doc:`number </values/number>`.

.. sourcecode:: js

	if(thing.matches('cap:carbon-monoxide')) {
		console.log('Carbon monoxide:', thing.carbonMonoxide);
	}

API
---

.. js:function:: carbonMonoxide

	Get the current carbon monoxide levels as PPM.

	:returns:
		Promise that resolves to the current value as a
		:doc:`number </values/number>`.

	.. sourcecode:: js

		console.log('CO is:', await thing.carbonMonoxide());

.. js:function:: co()

	Get the current carbon monoxide levels as PPM.

	:returns:
		Promise that resolves to the current value as a
		:doc:`number </values/number>`.

	.. sourcecode:: js

		console.log('CO is:', await thing.co());

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

.. js:function:: updateCarbonMonoxide(value)

	Update the current carbon monoxide level. Should be called whenever a change
	in PPM is detected.

	:param value:
		The new PPM value. Will be converted to a :doc:`number </values/number>`.

	Example:

	.. sourcecode:: js

		this.updateCarbonMonoxide(0);

Implementing capability
-----------------------

Implementors of this capability should call ``updateCarbonMonoxide`` whenever the
PPM of carbon monoxide changes.

.. sourcecode:: js

	const { Sensor, CarbonMonoxide } = require('abstract-things/sensors');

	class Example extends Sensor.with(CarbonMonoxide) {

		constructor() {
			super();

			this.updateCarbonMonoxide(0);
		}

	}
