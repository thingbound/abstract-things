``cap:state`` - state tracking
===================================

The ``state``-capability provides a way to get and update the state of a thing.
State is split into several state keys that are updated separately.

.. sourcecode:: js

	if(thing.matches('cap:state')) {
		console.log('Current state:', this.state);
	}

API
---

.. js:attribute:: state

	Get the current overall state.

	:returns: Object representing the current state. Keys represent names of the state key.

	Usage:

	.. sourcecode:: js

		const state = thing.state;
		console.log('State is', state);
		console.log('Value of power is', state.power);

Events
------

.. js:data:: stateChanged

	State has changed for the thing.

	.. sourcecode:: js

		thing.on('stateChanged', change =>
			console.log('Key', change.key, 'changed to', change.value)
		);

Protected methods
-----------------

.. js:function:: getState(key[, defaultValue])

	Get the current value of the given state key.

	:param string power: The state key to get value for.
	:param defaultValue: Fallback to return if the state key is not set.
	:returns: The value for the state key, the default value or ``null``.

.. js:function:: updateState(key, value)

	Update the state of the given key. This will update the state key and emit
	the event ``stateChanged``.

	:param string key: The state key to update.
	:param value: The new value of the state key.
	:returns: Boolean indicating if the state value has changed.


.. js:function:: removeState(key)

	Remove state stored for the given key. Will emit a ``stateChanged`` event.

	:param string key: The state key to remove.

Implementing capability
------------------------

The ``state``-capability has no functions that need to be implemented.
``updateState`` can be called at any time to update a state key.

.. sourcecode:: js

	const { Thing, State } = require('abstract-things');

	class Example extends Thing.with(State) {
		constructor() {
			super();

			this.updateState('key', true);
		}
	}
