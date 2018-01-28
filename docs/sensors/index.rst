Sensors
=======

The type ``sensor`` is used to mark things that read one or more values.

.. sourcecode:: js

	if(thing.matches('type:sensor') {
		console.log('Sensor values:', thing.values());
	}

	if(thing.matches('type:sensor', 'cap:temperature')) {
		console.log('Temperature:', thing.temperature());
	}

.. toctree::
	:maxdepth: 1
	:caption: Capabilities

	atmospheric-pressure
	carbon-dioxide-detection
	carbon-dioxide-level
	carbon-monoxide-detection
	carbon-monoxide-level
	contact-detection
	illuminance
	motion-detection
	pm2.5
	pm10
	power-consumed
	power-load
	relative-humidity
	smoke-detection
	temperature
	voltage
	water-detection
