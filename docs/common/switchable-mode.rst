``switchable-mode`` - switch mode
====================================

Capability used for things that can switch their mode.

.. sourcecode:: js

	if(thing.matches('cap:switchable-mode')) {
		console.log('Mode is', thing.mode());

		// Switch the mode
		thing.mode('new-mode')
			.then(mode => console.log('Mode is now', mode))
			.catch(err => console.log('Failed to switch mode', err));
	}

API
---

.. js:function:: mode([newMode])

	Get or set the mode of the thing. Will return the mode as a string if no
	mode is specified. Will return a promise if a mode is specified.

	:param string newMode: Optional mode to change to.
	:returns: Promise when switching mode, string if getting.

	Example:

	.. sourcecode:: js

		// Getting returns a string
		const currentMode = thing.mode();

		// Switching returns a promise
		thing.mode('new-mode')
			.then(result => console.log('Mode is now', result))
			.catch(err => console.log('Error occurred', err);

.. js:function setMode(newMode)

	Change the current mode.

	:param string newMode: Mode to change to.
	:returns: Promise that resolves to the new mode.

	Example:

	.. sourcecode:: js

		thing.setMode('new-mode)
			.then(result => console.log('Mode is now', result))
			.catch(err => console.log('Error occurred', err);

Protected methods
-----------------

.. js:function:: changeMode(newMode)

	*Abstract*. Change to a new mode. Will be called whenever a change to the
	mode is requested. Implementations should call ``updateMode(newMode)``
	before resolving to indicate that the mode has changed.

	:param string newMode: The new mode of the thing.
	:returns: Promise if asynchronous.

Implementing capability
-----------------------

Implementations require that the method ``changeMode`` is implemented.

.. sourcecode:: js

	const { Thing, SwitchableMode } = require('abstract-things');

	class Example extends Thing.with(SwitchableMode) {

		changeMode(newMode) {
			return swithcWithPromise(newMode)
				.then(() => this.updateMode(newMode));
		}

	}
