``cap:autonomous-charging`` - request charging
===============================================

The ``autonomous-charging`` capability is used for things that have a battery
and can charge it on request. This is commonly things such as vacuum robots
that can head to a charging station to recharge.

.. sourcecode:: js

	if(thing.matches('cap:autonomous-charging')) {
		thing.charge()
			.then(() => console.log('Charging has been requested'))
			.catch(...);
	}

API
---

.. js:function:: charge()

	Request that the thing charges.

	:returns: Promise that resolves to ``null``

	Example:

	.. sourcecode:: js

		thing.charge()
			.then(...)
			.catch(...);

		await thing.charge();


Protected methods
-----------------

.. js:function:: activateCharging()

	Activate charging of the thing. Called by ``charge()``.

	:returns: Promise that resolves when activation is performed.

	Example:

	.. sourcecode:: js

		activateCharging() {
			return activateChargingSomehow();
		}

Implementing capability
-----------------------

When implementing this capability the implementor needs to implement the
method ``activateCharging``.

.. sourcecode:: js

	const { Thing, AutonomousCharging } = require('abstract-things');

	class Example extends Thing.with(AutonomousCharging) {

		activateCharging() {
			// Create a promise that resolves when charging has been activated
			return activateChargingSomehow();
		}

	}
