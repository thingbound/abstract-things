Pressure
============

Representation of pressure. Returns objects created by `amounts
<https://github.com/aholstenson/amounts>`_.

.. sourcecode:: js

	const { pressure } = require('abstract-things/values');

	// With no unit - pascal is the default unit
	const v = pressure(101325);
	console.log(v.value);
	console.log(v.atm); // convert to atmospheres

	// With a unit
	console.log(pressure(1, 'atm'));

	// String (with our without unit)
	console.log(pressure('2000 hPa'));

Units
-----

+-----------------------+----------+-----------------------------------+
| Unit                  | SI       | Names                             |
+=======================+==========+===================================+
| Pascal                | Yes      | ``pa``, ``Pa``, ``pascal``,       |
|                       |          | ``pascals``                       |
+-----------------------+----------+-----------------------------------+
| Atmosphere            | No       | ``atm``, ``atmosphere``,          |
|                       |          | ``atmospheres``                   |
+-----------------------+----------+-----------------------------------+
| Bar                   | No       | ``bar``, ``bars``                 |
+-----------------------+----------+-----------------------------------+
| PSI                   | No       | ``psi``,                          |
|                       |          | ``pounds per square inch``,       |
|                       |          | ``pound per square inch``         |
+-----------------------+----------+-----------------------------------+
| Torr                  | No       | ``torr``                          |
+-----------------------+----------+-----------------------------------+
| mmHg                  | No       | ``mmHg``, ‘millimetre of          |
|                       |          | mercury’,                         |
|                       |          | ``millimetres of mercury``,       |
|                       |          | ``millimeter of mercury``,        |
|                       |          | ``millimetres of mercury``        |
+-----------------------+----------+-----------------------------------+

String conversion
-----------------

Strings are parsed the same as for :doc:`numbers <number>` with the addition
of units being parsed. The default unit is pascal.

Examples: ``200``, ``200 Pa``, ``1 atm``, ``200 hPa``, ``1013.25 hPa``
