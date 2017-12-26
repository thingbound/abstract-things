``switchable-power`` - switch power state
=========================================

The ``switchable-power``-capability is an extension to the :doc:`power-capability <power>`
for things that can also switch their power state.

.. sourcecode:: js

	if(thing.matches('cap:switchable-power')) {
		console.log('Power is', thing.power());

		// Switch the thing on
		thing.power(true)
			.then(() => console.log('Power is now on'))
			.catch(err => console.log('Failed to switch power', err));
	}

Related capabilities: :doc:`power <power>`, :doc:`state <state>`

API
---

.. js:function:: power([powerState])

	Get or set the current power state.

	:param boolean powerState: Optional :doc:`boolean </values/boolean>` to change power state to.
	:returns: Promise when switching state, :doc:`boolean </values/boolean>` if getting.

	Example:

	.. sourcecode:: js

		// Getting returns a boolean
		const powerIsOn = thing.power();

		// Switching returns a promise
		thing.power(false)
			.then(result => console.log('Power is now', result))
			.catch(err => console.log('Error occurred', err);

.. js:function:: setPower(powerState)

	Set the power of the thing.

	:param boolean powerState: The new power state as a :doc:`boolean </values/boolean>`.
	:returns: Promise that will resolve to the new power state.

	Example:

	.. sourcecode:: js

		thing.setPower(true)
			.then(result => console.log('Power is now', result))
			.catch(err => console.log('Error occurred', err);

.. js:function:: togglePower()

	Toggle the power of the thing. Will use the currently detected power state
	and switch to the opposite.

	:returns: Promise that will resolve to the new power state.

	Example:

	.. sourcecode:: js

		thing.togglePower()
			.then(result => console.log('Power is now', result))
			.catch(err => console.log('Error occurred', err);

.. js:function:: turnOn()

	Turn the thing on.

	:returns: Promise that will resolve to the new power state.

	Example:

	.. sourcecode:: js

		thing.turnOn()
			.then(result => console.log('Power is now', result))
			.catch(err => console.log('Error occurred', err);

.. js:function:: turnOff()

	Turn the thing off.

	:returns: Promise that will resolve to the new power state.

	Example:

	.. sourcecode:: js

		thing.turnOff()
			.then(result => console.log('Power is now', result))
			.catch(err => console.log('Error occurred', err);

Protected methods
-----------------

.. js:function:: changePower(power)

	*Abstract*. Change the power of this thing. Called on the thing when of
	the power methods request a change. Implementations should call
	``updatePower`` before resolving to indicate that a change has occurred.

	Can be called with the same power state as is currently set.

	:param boolean power: The new power of the thing as a :doc:`boolean </values/boolean>`.
	:returns: Promise if asynchronous.

Implementing capability
-----------------------

The ``switchable-power``-capability requires that the function ``changePower``
is implemented.

Example:

.. sourcecode:: js

	const { Thing, SwitchablePower } = require('abstract-things');

	class Example extends Thing.with(SwitchablePower) {
		constructor() {
			super();

			// Make sure to initialize the power state via updatePower
		}

		changePower(power) {
			/*
			 * This method is called whenever a power change is requested.
			 *
			 * Change the power here and return a Promise if the method is
			 * asynchronous. Also call updatePower to indicate the new state
			 * if not done by switching.
			 */
			 return switchWithPromise(power)
			 	.then(() => this.updatePower(power));
		}
	}
