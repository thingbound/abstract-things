``type:power-strip`` - Power strips
===================================

Things marked with ``power-strip`` represent a power strip with several outlets.
Power strips can expose their individual outlets as children, in which case
they implement the :doc:`children </common/children>` capability.

.. sourcecode:: js

	if(thing.matches('type:power-strip')) {
		// This is a power strip

		if(thing.matches('cap:children')) {
			// Each outlet in the strip is available as a child
			const firstOutlet = thing.getChild('1'); // depends on the implementation
		}
	}

Implementing type
-----------------

Without any children:

.. sourcecode:: js

	const { PowerStrip } = require('abstract-things/electrical');

	class Example extends PowerStrip.with(...) {

	}

With outlets as children:

.. sourcecode:: js

	const { Children } = require('abstract-things');
	const { PowerStrip, PowerOutlet } = require('abstract-things/electrical');

	class Example extends PowerStrip.with(Children, ...) {

		constructor() {
			super();

			this.addChild(new ExampleOutlet(this, 1));
			this.addChild(new ExampleOutlet(this, 2));
		}

	}

	class ExampleOutlet extends PowerOutlet.with(...) {

		constructor(parent, idx) {
			this.parent = parent;
			this.id = parent.id + ':' + idx;
		}

	}
