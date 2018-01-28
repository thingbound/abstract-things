``type:air-monitor`` - Air quality monitor
==========================================

This type is used for things where the primary function is to monitor
air quality. Commonly these things are :doc:`sensors </sensors>` that report
values such as :doc:`PM2.5 </sensors/pm2.5>`, :doc:`PM!= </sensors/pm10>`,
:doc:`carbon dioxide </sensors/carbon-dioxide-level>` or
:doc:`carbon monoxide </sensors/carbon-monoxide-level>`.

.. sourcecode:: js

	if(thing.matches('type:air-monitor')) {
		// The thing is an air monitor
	}

Implementing type
-----------------

.. sourcecode:: js

	const { AirMonitor } = require('abstract-things/climate');

	class Example extends AirMonitor.with(...) {

	}
