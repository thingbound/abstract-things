``cap:carbon-dioxide-detection`` - detect abnormal CO2 levels
==============================================================

This capability is used to mark sensors that monitor the presence of carbon
dioxide in abnormal quantities. The threshold at which to trigger the
detection is up to the sensor.

.. sourcecode:: js

	if(thing.matches('cap:carbon-dioxide-detection')) {
		console.log('Detected CO2:', await thing.carbonDioxideDetected());

		thing.on('carbonDioxide', () => console.log('CO2 has been detected'));
		thing.on('carbonDioxideDetected', () => console.log('CO2 is no longer detected'));
	}

API
---

.. js:function:: carbonDioxideDetected()

	Get if carbon dioxide is being detected.

	:returns:
		Promise that resolves to a :doc:`boolean </values/boolean>` indicating
		if carbon dioxide is currently being detected.

	Example:

	.. sourcecode:: js

		// Using async/await
		const carbonDioxidePresent = await thing.carbonDioxideDetected();

		// Using promise then/catch
		thing.carbonDioxideDetected()
			.then(carbonDioxidePresent => ...)
			.catch(...);

Events
------

.. describe:: carbonDioxideDetectedChanged

	The current carbon dioxide detection status has changed.

	.. sourcecode:: js

		thing.on('carbonDioxideDetectedChanged', value => console.log('Detection changed to:', value));

.. describe:: carbonDioxide

	Emitted when carbon dioxide has been detected and ``carbonDioxideDetected()`` changes to ``true``.

	.. sourcecode:: js

		thing.on('carbonDioxide', () => console.log('CO2 detected'));

.. describe:: carbonDioxideCleared

	Emitted when carbon dioxide is no longer detected and ``carbonDioxideDetected`` changes to
	``false``.

	.. sourcecode:: js

		thing.on('carbonDioxideCleared', () => console.log('Carbon dioxide no longer detected'));

Protected methods
-----------------

.. js:function:: updateCarbonDioxideDetected(value[, autoIdleTimeout])

	Update the current carbon dioxide detected status.

	:param boolean value:
		The carbon dioxide detected status, ``true`` if carbon dioxide detected
		otherwise ``false``.
	:param duration autoIdleTimeout:
		Optional duration to switch back the carbon dioxide detection status
		to ``false``.

	Example:

	.. sourcecode:: js

		this.updateCarbonDioxideDetected(false);

		this.updateCarbonDioxideDetected(true, '20s');

Implementing capability
-----------------------

Implementors of this capability should call ``updateCarbonDioxideDetected`` when
carbon dioxide is detected. Implementations may choose between using automatic timeouts
for switching carbonDioxide detected status back to ``false`` or managing the switching
on their own.

.. sourcecode:: js

	const { Sensor, CarbonDioxideDetection } = require('abstract-things/sensors');

	class Example extends Sensor.with(CarbonDioxideDetection) {

		constructor() {
			super();

			this.updateCarbonDioxideDetected(true, '1m');
		}

	}
