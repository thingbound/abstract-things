``type:controller`` - Generic controller
========================================

The ``controller`` type is used for things that are controllers and can be
combined with more specific types.

Controllers commonly emit events and implement the
:doc:`actions-capability <actions>`.

.. sourcecode:: js

	if(thing.matches('type:controller')) {
		// This is a wall controller

		if(thing.matches('cap:actions')) {
			// Controller supports listening for actions
		}
	}

Implementing type
-----------------

.. sourcecode:: js

	const { Controller, Actions } = require('abstract-things/controllers');

	class Example extends Controller.with(Actions, ...) {

	}
