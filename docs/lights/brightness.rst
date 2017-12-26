``brightness`` - read brightness
================================

Capability used when a light supports reading the brightness. Usually this is
combined with :doc:`dimmable <dimmable>` for lights that can actually change
their brightness.

.. sourcecode:: js

	if(thing.matches('cap:brightness')) {
		console.log(thing.brightness());
	}

API
---

.. js:function:: brightness()

	Get the brightness of the light.

	:returns:
		Percentage, number between 0 and 100, representing the brightness.

	Example:

	.. sourcecode:: js

		console.log(thing.brightness);

Events
------

.. js:data:: brightnessChanged

	Brightness has changed.

	.. sourcecode:: js

		thing.on('brightnessChanged', bri => console.log('Brightness is now', bri));

Protected functions
------------------------

.. js:function:: updateBrightness(brightness)

	Update the current brightness. Should be called whenever the brightness
	has been detected to have changed.

	:param number brightness: The new brightness.

Implementing capability
-----------------------

This capability has no functions that need to be implemented. Things using
the capability should call ``updateBrightness`` whenever the brightness
changes.

.. sourcecode:: js

	const { Light, Brightness } = require('abstract-things/lights');

	class Example extends Light.with(Brightness) {

		initCallback() {
			return super.initCallback()
				.then(() => this.updateBrightness(initialBrightnessHere));
		}

	}