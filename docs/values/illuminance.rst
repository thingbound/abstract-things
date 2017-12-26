Illuminance
============

Representation of an illuminance level. Returns objects created by `amounts
<https://github.com/aholstenson/amounts>`_.

.. sourcecode:: js

	const { illuminance } = require('abstract-things/values');

	// With no unit - lux are the default unit
	const v = illuminance(200);
	console.log(v.value);
	console.log(v.fc); // convert to foot-candle
	console.log(v.lux); // convert to lux

	// With a unit
	console.log(illuminance(5, 'lx'));

	// String (with our without unit)
	console.log(illuminance('200 lx'));

Units
-----

+-----------------------+----------+-----------------------------------+
| Unit                  | SI       | Names                             |
+=======================+==========+===================================+
| Lux                   | Yes      | ``lx``, ``lux``                   |
+-----------------------+----------+-----------------------------------+
| Phot                  | No       | ``ph``, ``phot``                  |
+-----------------------+----------+-----------------------------------+
| Nox                   | No       | ``nx``, ``nox``                   |
+-----------------------+----------+-----------------------------------+
| Foot-candle           | No       | ``fc``, ``lm/ft²``, ``ft-c``,     |
|                       |          | ``foot-candle``,                  |
|                       |          | ``foot-candles``,                 |
|                       |          | ``foot candle``, ``foot candles`` |
+-----------------------+----------+-----------------------------------+

String conversion
-----------------

Strings are parsed the same as for :doc:`numbers <number>` with the addition
of units being parsed. The default unit is lux.

Examples: ``200``, ``200 lx``, ``5 fc``, ``5 phot``
