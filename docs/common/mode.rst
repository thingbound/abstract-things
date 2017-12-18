``mode`` - monitor mode
=======================

``mode`` is used for things that have a mode that can be monitored.

.. sourcecode:: js

	if(thing.matches('cap:mode')) {
		console.log('Mode is', thing.mode());
	}

Actions
---------


.. js:function:: mode()

	Get the current mode of the thing.

	:returns: String indicating the mode.

	Example:

	.. sourcecode:: js

		console.log(thing.mode());

.. js:attribute:: modes

	Get the modes that this thing supports. Will return an array with strings
	representing the modes.

	Example:

	.. sourcecode:: js

		console.log(thing.modes);

.. js:attribute:: state.mode

	State-key representing the current mode.

.. js:attribute:: state.modes

	State-key representing the modes.

Events
-------

.. describe:: mode

	The current mode has changed.

	.. sourcecode:: js

		thing.on('mode', mode => console.log('Mode is now', mode));

.. describe:: modes

	The available modes have changed.

Protected functions
-------------------

.. js:function:: updateMode(mode)

	Update the currently detected mode. Calling this method with a new mode
	will change the mode and trigger the ``mode`` event.

	:param string mode: The current mode.

	Example:

	.. sourcecode:: js

		this.updateMode('silent');

.. js:function:: updateModes(modes)

	Update the modes that are available for the thing.

	:param array modes: Array of modes as string.

	Example:

	.. sourcecode:: js

		this.updateModes([ 'idle', 'silent', 'auto' ]);

Implementing capability
-----------------------

When implementing this capability call ``updateModes`` in the constructor or
``initCallback`` of the thing. ``updateMode`` should be used whenever the mode
is changed.

Example:

.. sourcecode:: js

	const { Thing, Mode } = require('abstract-things');

	class Example exends Thing.with(Mode) {
		initCallback() {
			return super.initCallback()
				.then(() => this.updateModes(modesDetected));
		}
	}