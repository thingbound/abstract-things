``cap:cleaning-state`` - get if cleaning
=========================================

``cleaning-state`` is used when a thing can report if is currently cleaning.
This is commonly used for things that also support
:doc:`autonomous cleaning <autonomous-cleaning>`. Things implementing This
capability also support :doc:`error states </common/error-state>`.

.. sourcecode:: js

	if(thing.matches('cap:cleaning-state')) {
		console.log('Currently cleaning:', await thing.cleaning());
	}

API
---

.. js:function: cleaning()

	Get if the thing is currently performing cleaning.

	:returns:
		Promise that resolves to a :doc:`boolean </values/boolean>` indicating
		if cleaning is being done.

	Example:

	.. sourcecode:: js

		// Using async/await
		const isCleaning = await thing.cleaning();

		// Using promise then/catch
		thing.cleaning()
			.then(isCleaning => ...)
			.catch(...);

Events
------

.. describe:: cleaningChanged

	The cleaning state has changed. Payload will be the new state as a
	:doc:`boolean </values/boolean>`.

	Example:

	.. sourcecode:: js

		thing.on('cleaningChanged', c => ...);

.. describe:: cleaningStarted

	Cleaning has started.

	Example:

	.. sourcecode:: js

		thing.on('cleaningStarted', () => console.log('Doing some cleaning'));

.. describe:: cleaningDone

	Cleaning was completed without any errors.

	.. sourcecode:: js

		thing.on('cleaningDone', () => console.log('Cleaning is now done'));

.. describe:: cleaningError

	Cleaning has encountered an error.

	.. sourcecode:: js

		thing.on('cleaningError', () => console.log('Cleaning encountered an error'));

.. describe:: cleaningStopped

	Cleaning has stopped (for any reason).

	.. sourcecode:: js

		thing.on('cleaningStopped', () => console.log('No longer doing any cleaning'));

Protected methods
-----------------

.. js:function:: updateCleaning(cleaning)

	Update wether the thing is performing cleaning or not.

	:param boolean cleaning:
		:doc:`Boolean </values/boolean>` indicating if cleaning is currently
		being performed.

	Example:

	.. sourcecode:: js

		// Currently doing some cleaning
		this.updateCleaning(true);

Implementing capability
-----------------------

When implementing this capability take care to call `updateCleaning` whenever
cleaning is being done and also when cleaning stops. For errors calling
`updateError(error)` will automatically set cleaning to `false`.

.. sourcecode:: js

	const { Thing } = require('abstract-things');
	const { CleaningState } = require('abstract-things/climate');

	class Example extends Thing.with(CleaningState) {

	}
