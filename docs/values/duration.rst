Duration
========

Representation of a duration of time. Returns objects created by `amounts
<https://github.com/aholstenson/amounts>`_.

.. sourcecode:: js

	const { duration } = require('abstract-things/values');

	// With no unit - milliseconds are the default unit
	const v = duration(2000);
	console.log(v.value);
	console.log(v.seconds); // number converted to seconds

	// With a unit
	console.log(duration(2, 's'));

	// String (with our without unit)
	console.log(duration('2 s'));
	console.log(duration('1m 10s'));
	console.log(duration('2 hours 5 m'));

Units
-----

+--------------+----+-------------------------------------------+
| Unit         | SI | Names                                     |
+==============+====+===========================================+
| Milliseconds | No | ``ms``, ``millisecond``, ``milliseconds`` |
+--------------+----+-------------------------------------------+
| Seconds      | No | ``s``, ``second``, ``seconds``            |
+--------------+----+-------------------------------------------+
| Minutes      | No | ``m``, ``minute``, ``minutes``            |
+--------------+----+-------------------------------------------+
| Hours        | No | ``h``, ``hour``, ``hours``                |
+--------------+----+-------------------------------------------+
| Days         | No | ``d``, ``day``, ``days``                  |
+--------------+----+-------------------------------------------+

String conversion
-----------------

Values in the string are parsed the same as for :doc:`numbers <number>` with
multiple values with units supported.

Examples: ``2000``, ``2000 ms``, ``5 s``, ``5 seconds``, ``1 hour, 10 minutes``,
``1d 5m``
