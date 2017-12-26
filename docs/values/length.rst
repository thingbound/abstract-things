Length
============

Representation of a length. Returns objects created by `amounts
<https://github.com/aholstenson/amounts>`_.

.. sourcecode:: js

	const { length } = require('abstract-things/values');

	// With no unit - metre is the default unit
	const v = length(2);
	console.log(v.value);
	console.log(v.cm); // convert to centimetres
	console.log(v.ft); // convert to feet

	// With a unit
	console.log(length(5, 'in'));

	// String (with our without unit)
	console.log(length('200 cm'));

Units
-----

+-------+-----+-----------------------------------------------------+
| Unit  | SI  | Names                                               |
+=======+=====+=====================================================+
| Metre | Yes | ``m``, ``meter``, ``meters``, ``metre``, ``metres`` |
+-------+-----+-----------------------------------------------------+
| Inch  | No  | ``in``, ``inch``, ``inches``                        |
+-------+-----+-----------------------------------------------------+
| Feet  | No  | ``ft``, ``foot``, ``feet``                          |
+-------+-----+-----------------------------------------------------+
| Yard  | No  | ``yd``, ``yard``, ``yards``                         |
+-------+-----+-----------------------------------------------------+
| Mile  | No  | ``mi``, ``mile``, ``miles``                         |
+-------+-----+-----------------------------------------------------+

String conversion
-----------------

Strings are parsed the same as for :doc:`numbers <number>` with the addition
of units being parsed. The default unit is metre.

Examples: ``200``, ``200 cm``, ``5 ft``, ``20 inches``
