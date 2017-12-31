``cap:power`` - monitor power state
====================================

The ``power``-capability is used for any thing that can monitor its power
state.

.. sourcecode:: js

	if(thing.matches('cap:power')) {
		console.log('Power is', thing.power());

		thing.on('powerChanged', power => console.log('Power is now', power));
	}

Related capabilities: :doc:`switchable-power <switchable-power>`, :doc:`state <state>`

API
---

.. js:function:: power()

	Get the current power state.

	:returns: :doc:`Boolean </values/boolean>` representing the current power state.

	Example:

	.. sourcecode:: js

		const powerIsOn = thing.power();

.. js:attribute:: state.power

	State-key indicating the current power state.

	Example:

	.. sourcecode:: js

		console.log(thing.state.power);

Events
------

.. describe:: powerChanged

	The current power state has changed. Payload will be current power state
	as a :doc:`boolean </values/boolean>`.

	.. sourcecode:: js

		thing.on('powerChanged', power => console.log('power is now:', power));

Protected methods
-----------------

.. js:function:: updatePower(power)

	Update the current power state of the thing. Will change the state key
	``power`` and emit the ``power`` event.

	:param boolean power: The current power state.

Implementing capability
-----------------------

The ``power``-capability has no functions that need to be implemented. Call
``updatePower`` whenever the monitored power state changes.

Example:

.. sourcecode:: js

	const { Thing, Power } = require('abstract-things');

	class Example extends Thing.with(Power) {
		constructor() {
			super();

			// Indicate that power has been switched every second
			setInterval(() => {
				this.updatePower(! this.state.power);
			}, 1000);
		}
	}
