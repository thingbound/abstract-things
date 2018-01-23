``cap:target-humidity`` - read the target humidity
===================================================

The ``target-humidity`` capability is used by things such as
:doc:`humidifers <humidifers>` and :doc:`dehumidifiers <dehumidifiers>` that
support stopping when a certain target humidity is reached. Some things may
also support setting the target humidity via
:doc:`adjustable-target-humidity <adjustable-target-humidity>`.

.. sourcecode:: js

	if(thing.matches('cap:target-humidity')) {
		const humidity = await thing.targetHumidity();
		console.log('Target humidity:', humidity);
	}

API
---

.. js:function:: targetHumidity()

	Get the current target humidity.

	:returns:
		Promise that resolves to the current target humidity as a
		:doc:`percentage </values/percentage>`.

	Example:

	.. sourcecode:: js

		const target = await thing.targetHumidity();

Events
------

.. describe:: targetHumidityChanged

	The current target humidity has changed. Payload will be the new target
	humidity as a :doc:`percentage </values/percentage>`.

	Example:

	.. sourcecode:: js

		thing.on('targetHumidityChanged', th => console.log('Target:', th));

Protected methods
-----------------

.. js:function:: updateTargetHumidity(target)

	Update the current target humidity.

	:param percentage target:
		The new target humidity as a :doc:`percentage </values/percentage>`.

	Example:

	.. sourcecode:: js

		this.updateTargetHumidity(40);
		this.updateTargetHumidity('55%');

Implementing capability
-----------------------

When implementing this capability the implementor needs to call
``updateTargetHumidity`` whenever a change in target humidity is detected.

.. sourcecode:: js

	const { Thing } = require('abstract-things');
	const { TargetHumidity } = require('abstract-things/climate');

	class Example extends Thing.with(TargetHumidity) {

	}
