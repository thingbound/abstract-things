``cap:autonomous-cleaning`` - activate cleaning
================================================

``autonomous-cleaning`` is an extension to :doc:`cleaning state <cleaning-state>`
for things that also support autonomously performing cleaning. This is commonly
used for robots such as robot vacuums and robot mops.

.. sourcecode:: js

	if(thing.matches('cap:autonomous-cleaning')) {

		const isCleaning = await thing.cleaning();
		if(! isCleaning) {
			// Request clean if not currently cleaning
			await thing.clean();
		}

	}

API
---

.. js:function:: clean()

	Start autonomous cleaning.

	:returns:
		Promise that resolves to ``null``.

	Example:

	.. sourcecode:: js

		// Using async/await
		await thing.clean();

		// Using promise then/catch
		thing.clean()
			.then(...)
			.catch(...);

.. js:function:: stop()

	Stop autonomous cleaning.

	:returns:
		Promise that resolves to ``null``.

	Example:

	.. sourcecode:: js

		// Using async/await
		await thing.stop();

		// Using promise then/catch
		thing.stop()
			.then(...)
			.catch(...);

Protected methods
-----------------

.. js:function:: activateCleaning()

	**Abstract.** Activate autonomous cleaning. Called whenever ``clean()``
	is called by the user.

	:returns:
		Promise if asynchronous.

	Example:

	.. sourcecode:: js

		activateCleaning() {
			return activateViaPromise(...)
				.then(() => this.updateCleaning(true));
		}

.. js:function:: deactivateCleaning()

	**Abstract.** Deactivate autonomous cleaning. Called whenever ``stop()``
	is called by the user.

	:returns:
		Promise if asynchronous.

	Example:

	.. sourcecode:: js

		deactivateCleaning() {
			return deactivateViaPromise(...)
				.then(() => this.updateCleaning(false));
		}

Implementing capability
-----------------------

When implementing this capability refer to the requirements of
:doc:`cleaning-state <cleaning-state>`. In addition to that the methods
``activateCleaning`` and ``deactivateCleaning`` need to be implemented.

Example:

.. sourcecode:: js

	const { Thing } = require('abstract-things');
	const { AutonomousCleaning } = require('abstract-things/climate');

	class Example extends Thing.with(AutonomousCleaning) {

		activateCleaning() {
			return ...;
		}

		deactivateCleaning() {
			return ...;
		}

	}
