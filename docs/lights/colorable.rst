``colorable`` - coloring of lights
==================================

Capability used for lights that can be colored.

.. sourcecode:: js

	if(thing.matches('type:light', 'cap:colorable')) {
		console.log('Current color', thing.color());

		thing.color('red')
			.then(color => console.log('Color is now', color))
			.catch(err => console.log('Error while setting color', err));
	}

API
---

.. js:function:: color([color[, duration]])

	Get the current color or change the color of the light.

	:param color:
		Optional color to set. The color can be specified in many formats,
		hex value such as ``#00ff00``, color names such as ``red`` and
		``blue``, and color temperatures such as ``4000K`` or ``overcast``.
	:param Duration duration:
		Optional duration to perform change in color over. Supported
		when the light has the :doc:`fading <fading>`-capability.

	Example:

	.. sourcecode:: js

		// Get the current color
		const currentColor = thing.color();

		// Change color
		thing.color('4000K')
			.then(color => console.log('Color is now', color))
			.catch(err => console.log('Error while setting color', err));

		// Change color over 2 seconds
		thing.color('#00ffff', '2s')
			.then(...)
			.catch(...);

Events
------

.. js:data:: color

	Color has changed.

	.. sourcecode:: js

		thing.on('color', color => console.log('Color is now', color));

Protected methods
-----------------

.. js:function:: updateColor(color)

	Update the current color of the light. Should be called whenever a change
	in color occurs for the light. If the color set has changed this will emit
	the ``color`` event.

	:param color: The color of the light.

.. js:function:: changeColor(color, duration)

	:param color:
	:param duration:
	:returns: Promise if change is asynchronous.

Implementing capability
-----------------------
