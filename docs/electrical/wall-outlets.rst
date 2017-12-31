``type:wall-outlet`` - Wall outlets
===================================

The ``wall-outlet`` type is used to mark things that represent a wall mounted
power outlet. Wall outlets like :doc:`power strips <strips>` can expose their
individual outlets as :doc:`children </common/children>`.

.. sourcecode:: js

	if(thing.matches('type:wall-outlet')) {
		// This is a wall outlet

		if(thing.matches('cap:children')) {
			// Each outlet is available as a child
			const firstOutlet = thing.getChild('1'); // depends on the implementation
		}
	}

Implementing type
-----------------

Without any children:

.. sourcecode:: js

	const { WallOutlet } = require('abstract-things/electrical');

	class Example extends WallOutlet.with(...) {

	}

With outlets as children:

.. sourcecode:: js

	const { Children } = require('abstract-things');
	const { WallOutlet, PowerOutlet } = require('abstract-things/electrical');

	class Example extends WallOutlet.with(Children, ...) {

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
