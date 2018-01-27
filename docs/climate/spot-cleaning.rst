``cap:spot-cleaning`` - support for spot cleaning
=================================================

This capability is commonly used together with
:doc:`autonomous cleaning <autonomous-cleaning>` to also support cleaning a
specific spot.

.. sourcecode:: js

	if(thing.matches('cap:spot-cleaning')) {
		// Do some cleaning around this spot
		await thing.cleanSpot();
	}

API
---

.. js:function:: cleanSpot()

	Activate cleaning for the current spot.

	:returns:
		Promise that resolves to ``null``.

	Example:

	.. sourcecode:: js

		// Using async/await
		await thing.cleanSpot();

		// Using promise then/catch
		thing.cleanSpot()
			.then(...)
			.catch(...);

Protected methods
-----------------

.. js:function:: activateCleanSpot()

	**Abstract.** Activate spot cleaning for this thing. Should call
	``updateCleaning`` when spot cleaning is activated.

	:returns:
		Promise if asynchronous.

	Example:

	.. sourcecode:: js

		activateCleanSpot() {
			return activateViaPromise(...);
		}

Implementing capability
-----------------------

When implementing this capability refer to the requirements of
:doc:`cleaning-state <cleaning-state>`. In addition to that the method
``activateCleanSpot`` needs to be implemented.

Example:

.. sourcecode:: js

	const { Thing } = require('abstract-things');
	const { SpotCleaning } = require('abstract-things/climate');

	class Example extends Thing.with(SpotCleaning) {

		activateCleanSpot() {
			return ...;
		}

	}
