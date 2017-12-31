``cap:colorable`` - coloring of lights
======================================

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
		Optional :doc:`color </values/color>` to set. The color can be
		specified in many formats, hex values such as ``#00ff00``, color names
		such as ``red`` and ``blue``, and color temperatures such as ``4000K``
		or ``overcast``.
	:param Duration duration:
		Optional :doc:`duration </values/duration>` to perform change in
		brightness over. Supported when the light has the
		:doc:`fading <fading>`-capability.

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

.. js:data:: colorChanged

	Color has changed. Payload will be the new :doc:`color </values/color>`.

	.. sourcecode:: js

		thing.on('colorChanged', color => console.log('Color is now', color));

Protected methods
-----------------

.. js:function:: updateColor(color)

	Update the current color of the light. Should be called whenever a change
	in color occurs for the light. If the color set has changed this will emit
	the ``color`` event.

	:param color: The :doc:`color </values/color>` of the light.

	.. sourcecode:: js

		this.updateColor('#ff00aa');

		const { color } = require('abstract-things/values');
		this.updateColor(color.rgb(255, 0, 170));

.. js:function:: changeColor(color, options)

	*Abstract*. Change the :doc:`color </values/color>` of the light.
	Implementation should support the following:

	* ``color`` should be converted to something supported by the light.
	* ``options.duration`` should be respected if the light supports fading.

	:param color:
		The new :doc:`color </values/color>` of the light. The colorspace of
		the light can be be anything, but is most commonly temperatures or
		rgb-values.
	:param options:
		Options for changing the color. The only option available is
		``duration`` which indicates amount of time the change should occur
		over.
	:returns: Promise if change is asynchronous.

Implementing capability
-----------------------

Implementations should call ``updateColor`` whenever the color of the light
changes. ``changeColor`` needs to be implemented and will be called whenever a
color change is requested. :doc:`color:temperature <color-temperature>` and
:doc:`color:full <color-full>` should be implemented to indicate the type of
color supported.

.. sourcecode:: js

	const { Light, Colorable, ColorFull } = require('abstract-things/lights');
	const { color } = require('abstract-things/values');

	class Example extends Light.with(Colorable, ColorFull) {

		initCallback() {
			return super.initCallback()
				.then(() => this.updateColor(color.rgb(0, 0, 0));
		}

		changeColor(color, options) {
			// Convert color to RGB colorspace
			const rgb = color.rgb;

			return setColorSomehow(rgb, options.duration);
		}
	}
