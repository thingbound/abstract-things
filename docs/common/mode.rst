``cap:mode`` - monitor mode
===========================

``mode`` is used for things that have a mode that can be monitored.

.. sourcecode:: js

	if(thing.matches('cap:mode')) {
		console.log('Mode is', await thing.mode());

		thing.on('modeChanged', mode => console.log('Mode is now', mode));
	}

API
---

.. js:function:: mode()

	Get the current mode of the thing.

	:returns:
		Promises that resolves to a :doc:`string </values/string>` indicating
		the identifier of the mode.

	Example:

	.. sourcecode:: js

		thing.mode()
			.then(mode => ...)
			.catch(...);

		const mode = await thing.mode();

.. js:function:: modes()

	Get the modes that this thing supports.

	:returns:
		Promise that will resolve to the modes as an array containing
		:doc:`codes </values/code>`.

	Example:

	.. sourcecode:: js

		const modes = await thing.modes();

		const firstMode = modes[0];
		console.log('Id:', firstMode.id);
		console.log('Description:', firstMode.description);

Events
-------

.. describe:: modeChanged

	The current mode has changed. Payload of the event is the current mode as
	a :doc:`string </values/string>`.

	.. sourcecode:: js

		thing.on('modeChanged', mode => console.log('Mode is now', mode));

.. describe:: modesChanged

	The available modes have changed.

Protected methods
-------------------

.. js:function:: updateMode(mode)

	Update the currently detected mode. Calling this method with a new mode
	will change the mode and trigger the ``mode`` event.

	:param string mode: The id of the current mode.

	Example:

	.. sourcecode:: js

		this.updateMode('silent');

.. js:function:: updateModes(modes)

	Update the modes that are available for the thing.

	:param array modes:
		Array of modes as :doc:`codes </values/code>`. Entries in the array
		will be automatically converted to codes if possible.

	Example:

	.. sourcecode:: js

		this.updateModes([
			'idle',
			'silent: Silent speed',
			{ id: 'auto', description: 'Autoselect speed' }
		]);

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
