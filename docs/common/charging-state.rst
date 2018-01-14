``cap:charging-state`` - monitor if charging
=============================================

The ``charging-state`` capability is used for things that have a battery and
can report if they are being charged or not. Some of these things will also
have the :doc:`battery-level <battery-level>` capability.

.. sourcecode:: js

	if(thing.matches('cap:charging-state')) {
		if(thing.charging) {
			// This thing is charging
		}
	}

API
---

.. js:attribute:: charging

	Get the current charging state as a :doc:`boolean </values/boolean>`.
	``true`` indicates that the thing is charging.

	:returns: The current charging state.

	Example:

	.. sourcecode:: js

		const isCharging = thing.charging;

Events
------

.. describe:: chargingChanged

	The current charging state has changed. Payload will be the new state
	a :doc:`boolean </values/boolean>`.

	.. sourcecode:: js

		thing.on('chargingChanged', v => console.log('Charging:', v));

.. describe:: chargingStarted

	The thing is now being charged.

	.. sourcecode:: js

		thing.on('chargingStarted', () => console.log('Charging started'));

.. describe:: chargingStopped

	The thing is no longer being charged.

	.. sourcecode:: js

		thing.on('chargingStopped', () => console.log('Charging stopped'));

Protected methods
-----------------

.. js:function:: updateCharging(chargingState)

	Update the current charging state. Should be called whenever a change in
	charging state is detected.

	:param boolean chargingState: The new charging state.

	Example:

	.. sourcecode:: js

		this.updateCharging(true);

Implementing capability
-----------------------

When implementing this capability the implementor needs to call
``updateCharging`` whenever the charging state changes.

.. sourcecode:: js

	const { Thing, ChargingState } = require('abstract-things');

	class Example extends Thing.with(ChargingState) {

		initCallback() {
			return super.initCallback()
				.then(readChargingStateSomehow)
				.then(chargingState => {
					this.updateCharging(chargingState);
				});
		}

	}
