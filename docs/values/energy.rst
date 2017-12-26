Energy
=======

Representation of an energy amount. Returns objects created by `amounts
<https://github.com/aholstenson/amounts>`_.

.. sourcecode:: js

	const { energy } = require('abstract-things/values');

	// With no unit - joules are assumed
	const v = energy(200);
	console.log(v.value);
	console.log(v.wh); // number converted to watt hours

	// With a unit
	console.log(energy(3.5, 'Wh'));

	// String (with our without unit)
	console.log(energy('5 J'));

Units
-----

+------------+------+-----------------------------------------------+
| Unit       | SI   | Names                                         |
+============+======+===============================================+
| Joules     | Yes  | ``J``, ``j``, ``joule``, ``joules``           |
+------------+------+-----------------------------------------------+
| Watt hours | True | ``Wh``, ``wh``, ``watt hour``, ``watt hours`` |
+------------+------+-----------------------------------------------+

String conversion
-----------------

Strings are parsed the same as for :doc:`numbers <number>` with the addition
of units being parsed. The default unit is joules.

Examples: ``200``, ``200 J``, ``3.5 Wh``, ``40 kJ``
