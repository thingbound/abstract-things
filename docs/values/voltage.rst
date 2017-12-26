Voltage
============

Representation of a voltage. Returns objects created by `amounts
<https://github.com/aholstenson/amounts>`_.

.. sourcecode:: js

	const { voltage } = require('abstract-things/values');

	// With no unit - volts is the default unit
	const v = voltage(20);
	console.log(v.value);
	console.log(v.volts); // convert to volts

	// With a unit
	console.log(voltage(50, 'V'));

	// String (with our without unit)
	console.log(voltage('220 volts'));

Units
-----

+------+-----+-----------------------------------+
| Unit | SI  | Names                             |
+======+=====+===================================+
| Volt | Yes | ``V``, ``v``, ``volt``, ``volts`` |
+------+-----+-----------------------------------+

String conversion
-----------------

Strings are parsed the same as for :doc:`numbers <number>` with the addition
of units being parsed. The default unit is volts.

Examples: ``20``, ``20 V``, ``100 volts``
