``fading`` - support for fading changes
=======================================

Capability used to mark lights that support fading of changes. When this
capability is present the ``duration`` argument for other methods is available.

.. sourcecode:: js

	if(thing.matches('type:light', 'cap:fading')) {
		// This light supports fading
		console.log('Maximum fading time in milliseconds:', this.maxChangeTime.ms);
	}

API
---

.. js:attribute:: maxChangeTime

	The maximum duration of time a change can be.

Implementing capability
-----------------------

Implementing this capability requires that the maximum change time is set
either in the constructor or in the ``initCallback()``.

Example:

.. sourcecode:: js

	const { Light, Fading } = require('abstract-things/lights');

	class Example extends Light.with(Fading) {

		initCallback() {
			return super.initCallback()
				// Set the maximum change time to 5 seconds
				.then(() => this.maxChangeTime = '5s'));
		}

	}
