``cap:adjustable-target-humidity`` - change the target humidity
===============================================================

The ``adjustable-target-humidity`` capability is an extension to
:doc:`target-humidity <target-humidity>` that in addition to reporting the
target humidity also supports setting it.

.. sourcecode:: js

	if(thing.matches('cap:changeable-target-humidity')) {
		const humidity = await thing.targetHumidity();
		console.log('Target humidity:', humidity);

		// Set the target humidity
		await thing.targetHumidity(20);
	}

API
---

.. js:function:: targetHumidity([target])

	Get or set the current target humidity.

	:param percentage target:
		Optional target humidity to set as a
		:doc:`percentage </values/percentage>`. If specified the thing will
		update the target humidity.
	:returns:
		Promise that resolves to the current or set target humidity as a
		:doc:`percentage </values/percentage>`.

	Example:

	.. sourcecode:: js

		const target = await thing.targetHumidity();

		await thing.targetHumidity(55);

.. js:function:: setTargetHumidity(target)

	Set the target humidity.

	:param percentage target:
		The target humidity as a :doc:`percentage </values/percentage>`.
	:returns:
		Promise that resolves to the set target humidity.

	Example:

	.. sourcecode:: js

		await thing.setTargetHumidity(40);

Protected methods
-----------------

.. js:function:: changeTargetHumidity(target)

	Abstract. Change the current target humidity.

	:param percentage target:
		The new target humidity as a :doc:`percentage </values/percentage>`.
	:returns:
		Promise if asynchronous.

	Example:

	.. sourcecode:: js

		changeTargetHumidity(target) {
			return actuallySetTargetHumidity(target);
		}

Implementing capability
-----------------------

When implementing this capability the implementor needs to call
``updateTargetHumidity`` whenever a change in target humidity is detected.
The ``changeTargetHumidity`` method must also be implemented.

.. sourcecode:: js

	const { Thing } = require('abstract-things');
	const { AdjustableTargetHumidity } = require('abstract-things/climate');

	class Example extends Thing.with(AdjustableTargetHumidity) {

		changeTargetHumidity(target) {
			return actuallySetTargetHumidity(target);
		}

	}
