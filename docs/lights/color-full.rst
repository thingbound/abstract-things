``cap:color:full`` - light supports full range of color
=======================================================

Capability used to mark lights that support setting any color.

.. sourcecode:: js

	if(thing.matches('type:light', 'cap:color:full')) {
		// This light supports any color
	}

Implementing capability
-----------------------

Implementors of this capability have no special requirements placed upon them.

Example:

	.. sourcecode:: js

		const { Light, ColorFull } = require('abstract-things/lights');

		class Example extends Light.with(ColorFull) {

			constructor() {
				super();
			}

		}
