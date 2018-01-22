``type:remote-control`` - Remote controls
=========================================

Remote controls are marked with the type ``remote-control``. Many remote
controls are capable of emitting events when buttons are pressed and implement
the :doc:`actions-capability <actions>`.

.. sourcecode:: js

	if(thing.matches('type:remote-control')) {
		// This is a remote control

		if(thing.matches('cap:actions')) {
			// Remote control supports listening for actions
		}
	}

Implementing type
-----------------

.. sourcecode:: js

	const { RemoteControl, Actions } = require('abstract-things/controllers');

	class Example extends RemoteControl.with(Actions, ...) {

	}
