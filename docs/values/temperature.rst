Temperature
============

Representation of a temperature. Returns objects created by `amounts
<https://github.com/aholstenson/amounts>`_.

.. sourcecode:: js

	const { temperature } = require('abstract-things/values');

	// With no unit - celsius is the default unit
	const v = temperature(20);
	console.log(v.value);
	console.log(v.F); // convert to fahrenheit
	console.log(v.celsius); // convert to celsius

	// With a unit
	console.log(temperature(50, 'F'));

	// String (with our without unit)
	console.log(temperature('220 K'));

Units
-----

+------------+-----+-----------------------------------------------+
| Unit       | SI  | Names                                         |
+============+=====+===============================================+
| Celsius    | No  | ``C``, ``c``, ``celsius``                     |
+------------+-----+-----------------------------------------------+
| Kelvin     | Yes | ``K``, ``kelvin``, ``kelvins``                |
+------------+-----+-----------------------------------------------+
| Fahrenheit | No  | ``F``, ``f``, ``fahrenheit``, ``fahrenheits`` |
+------------+-----+-----------------------------------------------+

String conversion
-----------------

Strings are parsed the same as for :doc:`numbers <number>` with the addition
of units being parsed. The default unit is Celsius.

Examples: ``20``, ``20 C``, ``100 kelvins``, ``30 F``
