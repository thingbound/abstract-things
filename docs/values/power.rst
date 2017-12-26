Power
============

Representation of power. Returns objects created by `amounts
<https://github.com/aholstenson/amounts>`_.

.. sourcecode:: js

	const { power } = require('abstract-things/values');

	// With no unit - watt is the default unit
	const v = power(200);
	console.log(v.value);
	console.log(v.hp); // convert to horsepower
	console.log(v.watt); // convert to watts

	// With a unit
	console.log(power(1, 'hp'));

	// String (with our without unit)
	console.log(power('200 W'));

Units
-----

+------------+-----+------------------------+
| Unit       | SI  | Names                  |
+============+=====+========================+
| Watt       | Yes | ``w``, ``W``, ``watt`` |
+------------+-----+------------------------+
| Horsepower | No  | ``hp``, ``horsepower`` |
+------------+-----+------------------------+

String conversion
-----------------

Strings are parsed the same as for :doc:`numbers <number>` with the addition
of units being parsed. The default unit is watt.

Examples: ``200``, ``200 W``, ``1 hp``, ``200 horsepower``
