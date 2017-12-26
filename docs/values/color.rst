Color
=====

Colors are available the ``color`` type and supports conversions between many
common color spaces.

.. sourcecode:: js

	const { color } = require('abstract-things/values');

	console.log(color('red'));
	console.log(color('5500K'));
	console.log(color('#ff0000'));
	console.log(color('hsl(300, 80%, 100%)'));

RGB
---

RGB colors are supported and are commonly created via either named colors, such
as ``red`` and ``purple`` or via Hex-notation such as ``#ff0000``.

RGB colors can be created via the ``rgb``-function:

.. sourcecode:: js

	const colorPicked = color.rgb(255, 0, 0);

Colors can be converted to RGB via the ``rgb``-accessor and their individual
components accessed:

.. sourcecode:: js

	const rgb = colorPicked.rgb;

	console.log('Red:', rgb.red);
	console.log('Green:', rgb.green);
	console.log('Blue:', rgb.blue);

Temperatures
------------

Color temperatures can be created from a string on the form ``[number]K``,
such as ``4000K`` or ``5500K``: ``color('4000K')``. Temperatures can also be
created via the ``temperature`` function: ``color.temperature(4000)``.

The following temperatures are available via name:

* ``overcast`` - 6500 Kelvins
* ``daylight`` - 5500 Kelvins
* ``sunrise`` - 2400 Kelvins
* ``sunset`` - 2400 Kelvins
* ``candle`` - 2000 Kelvins
* ``moonlight`` - 4100 Kelvins

Example:

.. sourcecode:: js

	color('4000K');
	color.temperature(5500);
	color('overcast');

Any color can be converted to its nearest temperature via the getter
``temperature``:

.. sourcecode:: js

	console.log(color('red').temperature);
	console.log(color('white').temperature);

The actual Kelvin-value is available via the ``kelvins`` accessor:

.. sourcecode:: js

	console.log(color.kelvins);

It's also possible to get a mired-version of the temperature which is used
by Zigbee-lights: ``color('4000K').mired.value``
