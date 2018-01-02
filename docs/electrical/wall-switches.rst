``type:wall-switch`` - Wall switches
====================================

The ``wall-switch`` type is used to mark things that represent a wall mounted
power switch. A wall switch is commonly used to control
:doc:`lights </lights/index>` or :doc:`power channels <channels>`.

.. sourcecode:: js

	if(thing.matches('type:wall-switch')) {
		// This is a wall switch

		if(thing.matches('cap:children')) {
			// Lights or power channels available as children
			const firstChild= thing.getChild('1'); // depends on the implementation
		}
	}

Implementing type
-----------------

Without any children:

.. sourcecode:: js

	const { WallSwitch } = require('abstract-things/electrical');

	class Example extends WallOutlet.with(...) {

	}

With power channels as children:

.. sourcecode:: js

	const { Children } = require('abstract-things');
	const { WallSwitch, PowerChannel } = require('abstract-things/electrical');

	class Example extends WallSwitch.with(Children, ...) {

		constructor() {
			super();

			this.addChild(new ExampleChild(this, 1));
			this.addChild(new ExampleChild(this, 2));
		}

	}

	class ExampleChild extends PowerChannel.with(...) {

		constructor(parent, idx) {
			this.parent = parent;
			this.id = parent.id + ':' + idx;
		}

	}
