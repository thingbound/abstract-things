``type:power-switch`` - Power switches
======================================

Things marked with ``power-switch`` are switches that control something.
Switches commonly control :doc:`power outlets <outlets>`,
:doc:`power channels <channels>` and :doc:`lights </lights/index>`.

.. sourcecode:: js

	if(thing.matches('type:power-switch')) {
		// This is a power switch
	}

Implementing type
-----------------

.. sourcecode:: js

	const { PowerSwitch } = require('abstract-things/electrical');

	class Example extends PowerSwitch.with(...) {

	}
