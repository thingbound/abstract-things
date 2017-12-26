Angle
=====

Representation of an angle. Returns objects created by `amounts
<https://github.com/aholstenson/amounts>`_.

.. sourcecode:: js

	const { angle } = require('abstract-things/values');

	// With no unit - degrees are the default unit
	const v = angle(200);
	console.log(v.value);
	console.log(v.rad); // number converted to radians

	// With a unit
	console.log(angle(5, 'rad'));

	// String (with our without unit)
	console.log(angle('5 rad'));

Units
-----

+--------+-----+----------------------------------+
| Unit   | SI  | Names                            |
+========+=====+==================================+
| Degree | No  | ``deg``, ``degree``, ``degrees`` |
+--------+-----+----------------------------------+
| Radian | Yes | ``rad``, ``radian``, ``radians`` |
+--------+-----+----------------------------------+

String conversion
-----------------

Strings are parsed the same as for :doc:`numbers <number>` with the addition
of units being parsed. The default unit is degrees.

Examples: ``200``, ``200 deg``, ``5 rad``, ``5 radians``
