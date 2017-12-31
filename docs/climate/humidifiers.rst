``type:humidifer`` - Humidifiers
=================================

Humidifiers are appliances that increase the humidity of the air. Many
humidifers will support :doc:`switchable-power </common/switchable-power>`
so that they can be switched on or off. Some implement
:doc:`switchable-mode </common/switchable-mode>` to support different modes,
such as switching between automatic and manual modes.

.. sourcecode:: js

	if(thing.matches('type:humidifier')) {
		// The thing is a humidifier
	}

Implementing type
-----------------

.. sourcecode:: js

	const { Humidifier } = require('abstract-things/climate');

	class Example extends Humidifier.with(...) {

	}
