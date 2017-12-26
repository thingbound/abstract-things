Mass
============

Representation of a mass. Returns objects created by `amounts
<https://github.com/aholstenson/amounts>`_.

.. sourcecode:: js

	const { mass } = require('abstract-things/values');

	// With no unit - grams is the default unit
	const v = mass(200);
	console.log(v.value);
	console.log(v.kg); // convert to kilograms
	console.log(v.lb); // convert to pounds

	// With a unit
	console.log(mass(5, 'lbs'));

	// String (with our without unit)
	console.log(mass('20 oz'));

Units
-----

+-------+-----+-----------------------------------------------------+
| Unit  | SI  | Names                                               |
+=======+=====+=====================================================+
| Gram  | Yes | ``g``, ``gram``, ``grams``, ``gramme``, ``grammes`` |
+-------+-----+-----------------------------------------------------+
| Pound | No  | ``lb``, ``lbs``, ``pound``, ``pounds``, ``#``       |
+-------+-----+-----------------------------------------------------+
| Ounce | No  | ``oz``, ``ounce``, ``ounces``                       |
+-------+-----+-----------------------------------------------------+
| Stone | No  | ``st``, ``stone``, ``stones``                       |
+-------+-----+-----------------------------------------------------+

String conversion
-----------------

Strings are parsed the same as for :doc:`numbers <number>` with the addition
of units being parsed. The default unit is grams.

Examples: ``200``, ``200 g``, ``5 kg``, ``20 lbs``
