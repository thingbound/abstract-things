``type:button`` - Single button
===============================

If a thing is a single button the type ``button`` is commonly used.
Buttons may emit events when buttons are pressed while implementing
the :doc:`actions-capability <actions>`. Buttons are automatically marked as
:doc:`controllers </controllers>`.

.. sourcecode:: js

	if(thing.matches('type:button')) {
		// This is a button

		if(thing.matches('cap:actions')) {
			// Button supports listening for actions
		}
	}

Implementing type
-----------------

.. sourcecode:: js

	const { Button, Actions } = require('abstract-things/controllers');

	class Example extends Button.with(Actions, ...) {

	}
