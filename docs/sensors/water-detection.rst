``cap:water-detection`` - detect water
=========================================

This capability is used to mark sensors that monitor the presence of water,
such as water leak and rain sensors.

.. sourcecode:: js

	if(thing.matches('cap:water-detection')) {
		console.log('Detected water:', await thing.waterDetected());

		thing.on('water', () => console.log('Water has been detected'));
		thing.on('waterDetected', () => console.log('Water is no longer detected'));
	}

API
---

.. js:function:: waterDetected()

	Get if water is being detected.

	:returns:
		Promise that resolves to a :doc:`boolean </values/boolean>` indicating
		if water is currently being detected.

	Example:

	.. sourcecode:: js

		// Using async/await
		const waterPresent = await thing.waterDetected();

		// Using promise then/catch
		thing.waterDetected()
			.then(waterPresent => ...)
			.catch(...);

Events
------

.. describe:: waterDetectedChanged

	The current water detection status has changed.

	.. sourcecode:: js

		thing.on('waterDetectedChanged', value => console.log('Detection changed to:', value));

.. describe:: water

	Emitted when water has been detected and ``waterDetected()`` changes to ``true``.

	.. sourcecode:: js

		thing.on('water', () => console.log('Water detected'));

.. describe:: waterCleared

	Emitted when water is no longer detected and ``waterDetected`` changes to
	``false``.

	.. sourcecode:: js

		thing.on('waterCleared', () => console.log('Water no longer detected'));

Protected methods
-----------------

.. js:function:: updateWaterDetected(value[, autoIdleTimeout])

	Update the current water detected status.

	:param boolean value:
		The water detected status, ``true`` if water detected otherwise ``false``.
	:param duration autoIdleTimeout:
		Optional duration to switch back the water detection status to ``false``.

	Example:

	.. sourcecode:: js

		this.updateWaterDetected(false);

		this.updateWaterDetected(true, '20s');

Implementing capability
-----------------------

Implementors of this capability should call ``updateWaterDetected`` when
water is detected. Implementations may choose between using automatic timeouts
for switching water detected status back to ``false`` or managing the switching
on their own.

.. sourcecode:: js

	const { Sensor, WaterDetection } = require('abstract-things/sensors');

	class Example extends Sensor.with(WaterDetection) {

		constructor() {
			super();

			this.updateWaterDetected(true, '1m');
		}

	}
