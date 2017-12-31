``type:air-purifier`` - Air purifiers
=====================================

Air purifiers are appliances that filter and purify the air. Commonly used
with the :doc:`switchable-power </common/switchable-power>` and
:doc:`switchable-mode </common/switchable-mode>` capabilities.

.. sourcecode:: js

	if(thing.matches('type:air-purifier')) {
		// The thing is an air purifier
	}

Implementing type
-----------------

.. sourcecode:: js

	const { AirPurifier } = require('abstract-things/climate');

	class Example extends AirPurifier.with(...) {

	}
