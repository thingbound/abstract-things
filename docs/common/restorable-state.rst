``restorable-state`` - capture and restore state
================================================

``restorable-state`` provides an extension to :doc:`state <state>` that supports
capturing and setting state.

.. sourcecode:: js

	if(thing.matches('cap:restorable-state')) {
		console.log('Keys that can be restored:' , thing.restorableState);

		// Capture the state
		const state = thing.captureState();

		// A bit later the state can be restored
		thing.setState(state)
			.then(() => console.log('State has been restored'))
			.catch(err => console.log('Error during state restore', err));
	}

API
---

.. js:attribute:: restorableState

	Get an array of the state-keys that are restorable.

	Example:

	.. sourcecode:: js

		console.log(thing.restorableState);
		console.log(thing.restorableState[0]);

.. js:function:: captureState()

	Capture all the state that can be restored.

	:returns: Object representing the state.

	Example:

	.. sourcecode:: js

		const state = thing.captureState();

.. js:function:: setState(state)

	Set the state of the thing. Can be used together with result captured via
	``captureState()``.

	:param object state: State to set.
	:returns: Promise that will resolve when state has been set.

	Example:

	.. sourcecode:: js

		thing.setState(state)
			.then(...)
			.catch(...);

Protected methods
-----------------

.. js:function:: changeState(state)

	*Abstract.* Change the state of the thing. Implementations should call
	``super`` and restore custom state-keys when that promise resolves.

	Example:

	.. sourcecode:: js

		changeState(state) {
			return super.changeState(state)
				.then(() => {
					if(typeof state.color !== 'undefined') {
						return changeColorSomehow(state.color);
					}
				});
		}

Implementing capability
------------------------

Most implementations of this capability are by other capabilities.
Implementations need to override both ``get restorableState`` and
``changeState``.

The getter for ``restorableState`` must also take care to include the state-keys
defined as restorable by its parent:

.. sourcecode:: js

	get restorableState() {
		return [ ...super.restorableState, 'own-key' ];
	}

It is recommended to provide a method that defines a default restore behavior,
so that its easy to override the default behavior if needed.

Example:

.. sourcecode:: js

	const { Thing, RestorableState } = require('abstract-things');

	const Custom = Thing.capability(Parent => class extends Parent.with(RestorableState) {

		get restorableState() {
			// Must call super.restorableState and make it part of the result
			return [ ...super.restorableState, 'color' ];
		}

		changeState(state) {
			return super.changeState(state)
				.then(() => {
					if(typeof state.color !== 'undefined') {
						return this.setColorState(state.color);
					}
				});
		}

		setColorState(color) {
			// The default restore behavior is to call setColor
			return this.setColor(color);
		}

		setColor(color) {
			...
		}
	});
