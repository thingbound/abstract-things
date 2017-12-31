``type:power-outlet`` - Power outlets
=====================================

Things marked with ``power-outlet`` represent a single outlet that can take a
single plug. Outlets can be both stand-alone and children of another thing,
such as a :doc:`power strip <strips>` or :doc:`wall outlet <wall-outlets>`.

The :doc:`power </common/power>` and
:doc:`switchable-power </common/switchable-power>` capability is commonly used
with outlets to switch the power of the outlet. Outlets can also be
:doc:`sensors </sensors/index>` if they report
:doc:`power load </sensors/power-load>` or
:doc:`power consumption </sensors/power-consumed>`.

.. sourcecode:: js

	if(thing.matches('type:power-outlet')) {
		// This is a power outlet

		if(thing.matches('cap:switchable-power')) {
			// And it also supports power switching
			thing.turnOn()
				.then(...)
				.catch(...);
		}
	}

Implementing type
-----------------

.. sourcecode:: js

	const { PowerOutlet } = require('abstract-things/electrical');

	class Example extends PowerOutlet.with(...) {

	}
