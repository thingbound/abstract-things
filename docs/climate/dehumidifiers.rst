``type:dehumidifier`` - Dehumidifers
====================================

Dehumidifiers are appliances that decrease the humidity of the air. Many
dehumidifers will support :doc:`switchable-power </common/switchable-power>`
so that they can be switched on or off. Some implement
:doc:`switchable-mode </common/switchable-mode>` to support different modes,
such as switching between automatic and manual modes.

.. sourcecode:: js

	if(thing.matches('type:dehumidifier')) {
		// The thing is a dehumidifier
	}

Implementing type
-----------------

.. sourcecode:: js

	const { Dehumidifier } = require('abstract-things/climate');

	class Example extends Dehumidifier.with(...) {

	}
