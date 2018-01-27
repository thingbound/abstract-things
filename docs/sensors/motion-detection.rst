``cap:motion-detection`` - motion sensing
=========================================

This capability is used to mark sensors that monitor movement.

.. sourcecode:: js

	if(thing.matches('cap:motion-detection')) {
		console.log('Detected motion:', await thing.motionDetected());

		thing.on('movement', () => console.log('Motion detected'));
		thing.on('inactivity', () => console.log('Inactivity detected'));
	}

API
---

.. js:function:: motionDetected()

	Get the motion status.

	:returns:
		Promise that resolves to a :doc:`boolean </values/boolean>` indicating
		if movement is currently detected.

	Example:

	.. sourcecode:: js

		// Using async/await
		console.log('Motion is:', awwait thing.motionDetected());

Events
------

.. describe:: motionDetectedChanged

	The current motion status has changed.

	.. sourcecode:: js

		thing.on('motionDetectedChanged', value => console.log('Motion changed to:', value));

.. describe:: movement

	Emitted when movement has been detected and ``motion`` changes to ``true``.

	.. sourcecode:: js

		thing.on('movement', () => console.log('Movement detected'));

.. describe:: inactivity

	Emitted when movement is no longer detected and ``motion`` changes to
	``false``.

	.. sourcecode:: js

		thing.on('inactivity', () => console.log('Movement no longer detected'));

Protected methods
-----------------

.. js:function:: updateMotionDetected(value[, autoIdleTimeout])

	Update the current motion status.

	:param boolean value:
		The motion status, ``true`` if motion detected otherwise ``false``.
	:param duration autoIdleTimeout:
		Optional duration to switch back the motion status to ``false``.

	Example:

	.. sourcecode:: js

		this.updateMotionDetected(false);

		// Set motion to true and automatically switch back after 20 seconds
		this.updateMotionDetected(true, '20s');

Implementing capability
-----------------------

Implementors of this capability should call ``updateMotion`` if motion is
detected. Implementations may choose between using automatic timeouts for
switching motion back to ``false`` or managing the switchin on their own.

.. sourcecode:: js

	const { Sensor, MotionDetection } = require('abstract-things/sensors');

	class Example extends Sensor.with(MotionDetection) {

		constructor() {
			super();

			this.updateMotionDetected(true, '1m');
		}

	}
