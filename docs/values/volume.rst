Volume
============

Representation of a volume. Returns objects created by `amounts
<https://github.com/aholstenson/amounts>`_.

.. sourcecode:: js

	const { volume } = require('abstract-things/values');

	// With no unit - litres is the default unit
	const v = volume(20);
	console.log(v.value);
	console.log(v.gallon); // convert to gallons
	console.log(v.L); // convert to litres
	console.log(v.ml); // convert to millilitres

	// With a unit
	console.log(volume(50, 'cl'));

	// String (with our without unit)
	console.log(voltage('220 ml'));

Units
-----

+-----------------------+-----------------------+-----------------------+
| Unit                  | SI                    | Names                 |
+=======================+=======================+=======================+
| Liter                 | Yes                   | ``l``, ``L``,         |
|                       |                       | ``liter``, ``litre``, |
|                       |                       | ``litre``, ``litres`` |
+-----------------------+-----------------------+-----------------------+
| Gallon                | No                    | ``gal``, ``gallon``,  |
|                       |                       | ``gallons``           |
+-----------------------+-----------------------+-----------------------+
| Quart                 | No                    | ``qt``, ``quart``,    |
|                       |                       | ``quarts``            |
+-----------------------+-----------------------+-----------------------+
| Pint                  | No                    | ``pt``, ``pint``,     |
|                       |                       | ``pints``             |
+-----------------------+-----------------------+-----------------------+
| Cup                   | No                    | ``cu``, ``cup``,      |
|                       |                       | ``cups``              |
+-----------------------+-----------------------+-----------------------+
| Fluid ounce           | No                    | ``floz``, ``oz``,     |
|                       |                       | ``fluid ounce``,      |
|                       |                       | ``ounce``,            |
|                       |                       | ``fluid ounces``,     |
|                       |                       | ``ounces``            |
+-----------------------+-----------------------+-----------------------+
| Tablespoon            | No                    | ``tb``, ``tbsp``,     |
|                       |                       | ``tbs``,              |
|                       |                       | ``tablesppon``,       |
|                       |                       | ``tablespoons``       |
+-----------------------+-----------------------+-----------------------+
| Teaspoon              | No                    | ``tsp``,              |
|                       |                       | ``teaspoon``,         |
|                       |                       | ``teaspoons``         |
+-----------------------+-----------------------+-----------------------+
String conversion
-----------------

Strings are parsed the same as for :doc:`numbers <number>` with the addition
of units being parsed. The default unit is litres.

Examples: ``1``, ``1 l``, ``100 cl``, ``5 tbps``
