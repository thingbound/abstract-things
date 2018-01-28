``cap:carbon-monoxide-detection`` - detect abnormal CO levels
==============================================================

This capability is used to mark sensors that monitor the presence of carbon
monoxide in abnormal quantities. The threshold at which to trigger the
detection is up to the sensor.

.. sourcecode:: js

	if(thing.matches('cap:carbon-monoxide-detection')) {
		console.log('Detected CO:', await thing.carbonMonoxideDetected());

		thing.on('carbonMonoxide', () => console.log('CO has been detected'));
		thing.on('carbonMonoxideDetected', () => console.log('CO is no longer detected'));
	}

API
---

.. js:function:: carbonMonoxideDetected()

	Get if carbon monoxide is being detected.

	:returns:
		Promise that resolves to a :doc:`boolean </values/boolean>` indicating
		if carbon monoxide is currently being detected.

	Example:

	.. sourcecode:: js

		// Using async/await
		const carbonMonoxidePresent = await thing.carbonMonoxideDetected();

		// Using promise then/catch
		thing.carbonMonoxideDetected()
			.then(carbonMonoxidePresent => ...)
			.catch(...);

Events
------

.. describe:: carbonMonoxideDetectedChanged

	The current carbon monoxide detection status has changed.

	.. sourcecode:: js

		thing.on('carbonMonoxideDetectedChanged', value => console.log('Detection changed to:', value));

.. describe:: carbonMonoxide

	Emitted when carbon monoxide has been detected and ``carbonMonoxideDetected()`` changes to ``true``.

	.. sourcecode:: js

		thing.on('carbonMonoxide', () => console.log('CO detected'));

.. describe:: carbonMonoxideCleared

	Emitted when carbon monoxide is no longer detected and ``carbonMonoxideDetected`` changes to
	``false``.

	.. sourcecode:: js

		thing.on('carbonMonoxideCleared', () => console.log('Carbon monoxide no longer detected'));

Protected methods
-----------------

.. js:function:: updateCarbonMonoxideDetected(value[, autoIdleTimeout])

	Update the current carbon monoxide detected status.

	:param boolean value:
		The carbon monoxide detected status, ``true`` if carbon monoxide detected
		otherwise ``false``.
	:param duration autoIdleTimeout:
		Optional duration to switch back the carbon monoxide detection status
		to ``false``.

	Example:

	.. sourcecode:: js

		this.updateCarbonMonoxideDetected(false);

		this.updateCarbonMonoxideDetected(true, '20s');

Implementing capability
-----------------------

Implementors of this capability should call ``updateCarbonMonoxideDetected`` when
carbon monoxide is detected. Implementations may choose between using automatic timeouts
for switching carbonMonoxide detected status back to ``false`` or managing the switching
on their own.

.. sourcecode:: js

	const { Sensor, CarbonMonoxideDetection } = require('abstract-things/sensors');

	class Example extends Sensor.with(CarbonMonoxideDetection) {

		constructor() {
			super();

			this.updateCarbonMonoxideDetected(true, '1m');
		}

	}
