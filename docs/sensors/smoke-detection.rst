``cap:smoke-detection`` - detect smoke
=========================================

This capability is used to mark sensors that monitor an environment for smoke.

.. sourcecode:: js

	if(thing.matches('cap:smoke-detection')) {
		console.log('Detected smoke:', await thing.smokeDetected());

		thing.on('smoke', () => console.log('Smoke has been detected'));
		thing.on('smokeDetected', () => console.log('Smoke is no longer detected'));
	}

API
---

.. js:function:: smokeDetected()

	Get if smoke is being detected.

	:returns:
		Promise that resolves to a :doc:`boolean </values/boolean>` indicating
		if smoke is currently being detected.

	Example:

	.. sourcecode:: js

		// Using async/await
		const smokePresent = await thing.smokeDetected();

		// Using promise then/catch
		thing.smokeDetected()
			.then(smokePresent => ...)
			.catch(...);

Events
------

.. describe:: smokeDetectedChanged

	The current smoke detection status has changed.

	.. sourcecode:: js

		thing.on('smokeDetectedChanged', value => console.log('Detection changed to:', value));

.. describe:: smoke

	Emitted when smoke has been detected and ``smokeDetected()`` changes to ``true``.

	.. sourcecode:: js

		thing.on('smoke', () => console.log('Smoke detected'));

.. describe:: smokeCleared

	Emitted when smoke is no longer detected and ``smokeDetected`` changes to
	``false``.

	.. sourcecode:: js

		thing.on('smokeCleared', () => console.log('Smoke no longer detected'));

Protected methods
-----------------

.. js:function:: updateSmokeDetected(value[, autoIdleTimeout])

	Update the current smoke detected status.

	:param boolean value:
		The smoke detected status, ``true`` if smoke detected otherwise ``false``.
	:param duration autoIdleTimeout:
		Optional duration to switch back the smoke detection status to ``false``.

	Example:

	.. sourcecode:: js

		this.updateSmokeDetected(false);

		this.updateSmokeDetected(true, '20s');

Implementing capability
-----------------------

Implementors of this capability should call ``updateSmokeDetected`` when
smoke is detected. Implementations may choose between using automatic timeouts
for switching smoke detected status back to ``false`` or managing the switching
on their own.

.. sourcecode:: js

	const { Sensor, SmokeDetection } = require('abstract-things/sensors');

	class Example extends Sensor.with(SmokeDetection) {

		constructor() {
			super();

			this.updateSmokeDetected(true, '1m');
		}

	}
