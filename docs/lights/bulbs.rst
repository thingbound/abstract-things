``type:light-bulb`` - Light bulbs
=================================

The type ``light-bulb`` is a marker used to mark lights that are of the bulb
type.

.. sourcecode:: js

	if(thing.matches('cap:light-bulb')) {
		// The thing is a light bulb
	}

Implementing capability
-----------------------

Light bulbs are an extension to :doc:`lights <implementing>` and need to
follow the same implementation guidelines.

.. sourcecode:: js

	const { LightBulb, SwitchablePower } = require('abstract-things/lights');

	class Example extends LightBulb.with(SwitchablePower) {

		changePower(power) {
			return changePowerOfLight(power);
		}

	}
