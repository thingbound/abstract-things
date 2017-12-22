Lights
======

The main type for lights is ``light``. Lights commonly use at least the
:doc:`switchable-power <../common/switchable-power>` capability.

.. sourcecode:: js

	if(thing.matches('type:light', 'cap:switchable-power')) {
		thing.power(true)
			.then(() => console.log('powered on'))
			.catch(err => console.log('error occurred', err));
	}

.. toctree::
	:maxdepth: 1
	:caption: Capabilities

	fading
	brightness
	dimmable
	colorable
