``motion`` - motion sensing
===========================

This capability is used to mark sensors that monitor movement.

.. sourcecode:: js

	if(thing.matches('cap:motion')) {
		console.log('Detected motion:', thing.motion);

		thing.on('movement', () => console.log('Motion detected'));
		thing.on('inactivity', () => console.log('Inactivity detected'));
	}

API
---

.. js:attribute:: motion

	Get the motion status. :doc:`Boolean </values/boolean>` indicating if
	movement is currently detected.

	.. sourcecode:: js

		console.log('Motion is:', thing.motion);

Events
------

.. js:data:: motionChanged

	The current motion status has changed.

	.. sourcecode:: js

		thing.on('motionChanged', value => console.log('Motion changed to:', value));

.. js:data:: movement

	Emitted when movement has been detected and ``motion`` changes to ``true``.

	.. sourcecode:: js

		thing.on('movement', () => console.log('Movement detected'));

.. js:data:: inactivity

	Emitted when movement is no longer detected and ``motion`` changes to
	``false``.

	.. sourcecode:: js

		thing.on('inactivity', () => console.log('Movement no longer detected'));

Protected methods
-----------------

.. js:function:: updateMotion(value[, autoIdleTimeout])

	Update the current motion status.

	:param boolean value:
		The motion status, ``true`` if motion detected otherwise ``false``.
	:param duration autoIdleTimeout:
		Optional duration to switch back the motion status to ``false``.

	Example:

	.. sourcecode:: js

		this.updateMotion(false);

		// Set motion to true and automatically switch back after 20 seconds
		this.updateMotion(true, '20s');

Implementing capability
-----------------------

Implementors of this capability should call ``updateMotion`` if motion is
detected. Implementations may choose between using automatic timeouts for
switching motion back to ``false`` or managing the switchin on their own.

.. sourcecode:: js

	const { Sensor, Motion } = require('abstract-things/sensors');

	class Example extends Sensor.with(Motion) {

		constructor() {
			super();

			this.updateMotion(true, '1m');
		}

	}
