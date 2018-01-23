``cap:brightness`` - read brightness
====================================

Capability used when a light supports reading the brightness. Usually this is
combined with :doc:`dimmable <dimmable>` for lights that can actually change
their brightness.

.. sourcecode:: js

	if(thing.matches('cap:brightness')) {
		console.log(await thing.brightness());
	}

API
---

.. js:function:: brightness()

	Get the brightness of the light.

	:returns:
		Promise that resolves to a :doc:`percentage </values/percentage>`
		between 0 and 100, representing the brightness.

	Example:

	.. sourcecode:: js

		console.log(await thing.brightness());

Events
------

.. js:data:: brightnessChanged

	Brightness has changed. The payload of the event will be the brightness as
	a :doc:`percentage </values/percentage>`.

	.. sourcecode:: js

		thing.on('brightnessChanged', bri => console.log('Brightness is now', bri));

Protected functions
------------------------

.. js:function:: updateBrightness(brightness)

	Update the current brightness. Should be called whenever the brightness
	has been detected to have changed.

	:param number brightness: The new brightness as a :doc:`percentage </values/percentage>`.

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
