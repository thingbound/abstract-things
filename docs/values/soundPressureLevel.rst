Sound Pressure Level
====================

Representation of a sound pressure level. Returns objects created by `amounts
<https://github.com/aholstenson/amounts>`_.

.. sourcecode:: js

	const { soundPressureLevel } = require('abstract-things/values');

	// With no unit - decibel is the default unit
	const v = soundPressureLevel(40.2);
	console.log(v.value);
	console.log(v.db); // convert to decibel

	// With a unit
	console.log(soundPressureLevel(50, 'dB'));

	// String (with our without unit)
	console.log(soundPressureLevel('20 decibels'));

Units
-----

+----------+----+----------------------------------------------------+
| Unit     | SI | Names                                              |
+==========+====+====================================================+
| Decibels | No | ``dB``, ``db``, ``dbs``, ``decibel``, ``decibels`` |
+----------+----+----------------------------------------------------+

String conversion
-----------------

Strings are parsed the same as for :doc:`numbers <number>` with the addition
of units being parsed. The default unit is decibel.

Examples: ``20``, ``45.5 dB``, ``100 decibels``
