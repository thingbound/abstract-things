Area
=====

Representation of an area. Returns objects created by `amounts
<https://github.com/aholstenson/amounts>`_.

.. sourcecode:: js

	const { area } = require('abstract-things/values');

	// With no unit - m² are the default unit
	const v = area(1);
	console.log(v.value);
	console.log(v.cm2); // number converted to cm²

	// With a unit
	console.log(angle(50, 'cm2'));

	// String (with our without unit)
	console.log(angle('1 m²'));

Units
-----

+-----------------------+----------+-----------------------------------+
| Unit                  | SI       | Names                             |
+=======================+==========+===================================+
| Square Meter          | Yes      | ``m²``, ``m^2``, ``m2``,          |
|                       |          | ``square metre``,                 |
|                       |          | ``square metres``,                |
|                       |          | ``square meter``,                 |
|                       |          | ``square meters``                 |
+-----------------------+----------+-----------------------------------+
| Square Inch           | No       | ``sq in``, ``square inch``,       |
|                       |          | ``square inches``                 |
+-----------------------+----------+-----------------------------------+
| Square Foot           | No       | ``sq ft``, ``square foot``,       |
|                       |          | ``square feet``                   |
+-----------------------+----------+-----------------------------------+
| Square Yard           | No       | ``sq yd``, ``square yard``,       |
|                       |          | ``square yards``                  |
+-----------------------+----------+-----------------------------------+
| Square Mile           | No       | ``sq mi``, ``square mile``,       |
|                       |          | ``square miles``                  |
+-----------------------+----------+-----------------------------------+
| Hectare               | No       | ``ha``, ``hectare``, ``hectares`` |
+-----------------------+----------+-----------------------------------+
| Acre                  | No       | ``acre``, ``acres``               |
+-----------------------+----------+-----------------------------------+

String conversion
-----------------

Strings are parsed the same as for :doc:`numbers <number>` with the addition
of units being parsed. The default unit is degrees.

Examples: ``200``, ``200 deg``, ``5 rad``, ``5 radians``
