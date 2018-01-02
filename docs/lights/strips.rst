``type:light-strip`` - Light strips
===================================

The type ``light-bulb`` is a marker used to mark lights that are of the strip
type.

.. sourcecode:: js

	if(thing.matches('cap:light-strip')) {
		// The thing is a light strip
	}

Implementing capability
-----------------------

Light strips are an extension to :doc:`lights <implementing>` and need to
follow the same implementation guidelines.

.. sourcecode:: js

	const { LightStrip, SwitchablePower } = require('abstract-things/lights');

	class Example extends LightStrip.with(SwitchablePower) {

		changePower(power) {
			return changePowerOfLight(power);
		}

	}
