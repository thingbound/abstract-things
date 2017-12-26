Speed
============

Representation of a speed. Returns objects created by `amounts
<https://github.com/aholstenson/amounts>`_.

.. sourcecode:: js

	const { speed } = require('abstract-things/values');

	// With no unit - metres/second is the default unit
	const v = speed(20);
	console.log(v.value);
	console.log(v.kph); // convert to kilometers per hour
	console.log(v.mps); // convert to metres per second

	// With a unit
	console.log(speed(50, 'km/h'));

	// String (with our without unit)
	console.log(speed('20 knots'));

Units
-----

+-------------------------+---------+----------------------------------+
| Unit                    | SI      | Names                            |
+=========================+=========+==================================+
| Metres/Second           | Yes     | ``m/s``, ``mps``,                |
|                         |         | ``metre per second``,            |
|                         |         | ``metres per second``,           |
|                         |         | ``meter per second``,            |
|                         |         | ``meters per second``,           |
|                         |         | ``metre/second``,                |
|                         |         | ``metres/second``,               |
|                         |         | ``meter/second``,                |
|                         |         | ``meters/second``                |
+-------------------------+---------+----------------------------------+
| Kilometre/Hour          | No      | ``km/h``, ``kph``,               |
|                         |         | ``kilometre per hour``,          |
|                         |         | ``kilometres per hour``,         |
|                         |         | ``kilometer per hour``           |
|                         |         | ``kilometers per hour``,         |
|                         |         | ``kilometers/hour``,             |
|                         |         | ``kilometre/hour``               |
+-------------------------+---------+----------------------------------+
| Miles/Hour              | No      | ``mph``, ``mile per hour``,      |
|                         |         | ``miles per hour``,              |
|                         |         | ``mile/hour``, ``miles/hour``    |
+-------------------------+---------+----------------------------------+
| Feet/Second             | No      | ``ft/s``, ``fps``,               |
|                         |         | ``foot per second``,             |
|                         |         | ``feet per second``,             |
|                         |         | ``foot/second``, ``feet/second`` |
+-------------------------+---------+----------------------------------+
| Knot                    | No      | ``kt``, ``knot``, ``knots``      |
+-------------------------+---------+----------------------------------+

String conversion
-----------------

Strings are parsed the same as for :doc:`numbers <number>` with the addition
of units being parsed. The default unit is metres per second.

Examples: ``20``, ``20 m/s``, ``100 km/h``, ``30 mph``, ``20 knots``
