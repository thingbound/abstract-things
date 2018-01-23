``cap:pm2.5`` - read PM2.5 density (air quality)
================================================

This capability is used to mark sensors that monitor fine particulate matter
(PM) of up to 2.5 micrometers (μm).

.. sourcecode:: js

	if(thing.matches('cap:pm2.5')) {
		console.log('PM2.5:', await thing.pm2_5());
	}

API
---

.. js:function:: pm2_5()

	Get the current PM2.5 as micrograms per cubic meter (μg/m³). Value is a
	:doc:`number </values/number>`.

	:returns:
		The current value as micrograms per cubic meter (μg/m³). Value is a
		:doc:`number </values/number>`.

	Example:

	.. sourcecode:: js

		console.log('PM2.5:', await thing.pm2_5());

.. js:function:: 'pm2.5'()

	Get the current PM2.5 as micrograms per cubic meter (μg/m³). Value is a
	:doc:`number </values/number>`.

	:returns:
		The current value as micrograms per cubic meter (μg/m³). Value is a
		:doc:`number </values/number>`.

	Example:

	.. sourcecode:: js

		console.log('PM2.5:', await thing['pm2.5']());

Events
------

.. js:data:: pm2.5Changed

	The PM2.5 has changed. Payload is a :doc:`number </values/number>` with
	the new PM2.5 as micrograms per cubic meter (μg/m³).

	Example:

	.. sourcecode:: js

		thing.on('pm2.5Changed', v => console.log('Changed to:', v));

Protected methods
-----------------

.. js:function:: updatePM2_5(value)

	Update the current PM2.5 as micrograms per cubic meter (μg/m³). Should be
	called whenever a change is detected.

	:param value:
		The new PM2.5 value. Will be converted to a
		:doc:`number </values/number>`.

	Example:

	.. sourcecode:: js

		this.updatePM2_5(10);

Implementing capability
-----------------------

Implementors of this capability should call ``updatePM2_5`` whenever the
detected PM2.5 changes.

.. sourcecode:: js

	const { Sensor, PM2_5 } = require('abstract-things/sensors');

	class Example extends Sensor.with(PM2_5) {

		constructor() {
			super();

			this.updatePM2_5(10);
		}

	}
