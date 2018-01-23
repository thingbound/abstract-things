``type:wall-controller`` - Controllers mounted on a wall
=======================================================

``wall-controller`` is used for controllers that are commonly mounted on a
wall, such as switches and scene controllers. Wall controllers are
automatically marked as :doc:`controllers </controllers>`.

Wall controllers may emit events when buttons are pressed while implementing
the :doc:`actions-capability <actions>`.

.. sourcecode:: js

	if(thing.matches('type:wall-controller')) {
		// This is a wall controller

		if(thing.matches('cap:actions')) {
			// Controller supports listening for actions
		}
	}

Implementing type
-----------------

.. sourcecode:: js

	const { WallController, Actions } = require('abstract-things/controllers');

	class Example extends WallController.with(Actions, ...) {

	}
