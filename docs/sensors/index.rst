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

	atmosphericPressure
	motion
	temperature
