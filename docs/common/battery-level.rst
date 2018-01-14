``cap:battery-level`` - monitor battery level
=============================================

The ``battery-level`` capability is used for things that have a battery that
can be monitored. Sometimes this capability is combined with
:doc:`charging-state <charging-state>` if the thing also can report when it is
being charged.

.. sourcecode:: js

	if(thing.matches('cap:battery-level')) {
		console.log('Current battery level:', thing.batteryLevel);
	}

API
---

.. js:attribute:: batteryLevel

	Get the current battery level as a :doc:`percentage </values/percentage>`
	between 0 and 100.

	:returns: The battery level in percent.

	Example:

	.. sourcecode:: js

		const level = thing.batteryLevel;

Events
------

.. describe:: batteryLevelChanged

	The current battery level has changed. Payload will be the new battery
	level as a :doc:`percentage </values/percentage>`.

	.. sourcecode:: js

		thing.on('batteryLevelChanged', batteryLevel => console.log('Battery level is now:', batteryLevel));

Protected methods
-----------------

.. js:function:: updateBatteryLevel(batteryLevel)

	Update the current battery level. Should be called whenever a change in
	battery level is detected.

	:param percentage batteryLevel:
		The new battery level. Will be converted to a
		:doc:`percentage </values/percentage>`.

	Example:

	.. sourcecode:: js

		this.updateBatteryLevel(20);
		this.updateBatteryLevel('10');

Implementing capability
-----------------------

When implementing this capability the implementor needs to call
``updateBatteryLevel`` whenever the battery level changes.

.. sourcecode:: js

	const { Thing, BatteryLevel } = require('abstract-things');

	class Example extends Thing.with(BatteryLevel) {

		initCallback() {
			return super.initCallback()
				.then(readBatteryLevelSomehow)
				.then(batteryLevel => {
					this.updateBatteryLevel(batteryLevel);
				});
		}

	}
