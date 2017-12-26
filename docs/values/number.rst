Number
========

Number value type.

.. sourcecode:: js

	const { number } = require('abstract-things/values');

	console.log(number(1234));
	console.log(number('1234'));
	console.log(number(12.34));
	console.log(number('12.34'));

String conversion
-----------------

The input string will be parsed into a number. Parsing supports integers such
as ``1`` and ``545``. Decimal points are also supported: ``1.2`` and ``4.51``.

SI-prefixes
-----------

Units in the SI system can be combined with SI-prefixes to create a new unit.
SI-prefixes are supported both by their short names and their long names.
Examples: `cm`, `milliliters`, `hPa`, `MW`, `kilowatt`

================== ==================== ===================== ===================================
Long Name          Short name           Factor                Factor (expanded)
================== ==================== ===================== ===================================
``yocto``          ``y``                10 :sup:`-24`         0.000 000 000 000 000 000 000 001
``zepto``          ``z``                10 :sup:`-21`         0.000 000 000 000 000 000 001
``atto``           ``a``                10 :sup:`-18`         0.000 000 000 000 000 001
``femto``          ``f``                10 :sup:`-15`         0.000 000 000 000 001
``pico``           ``p``                10 :sup:`-12`         0.000 000 000 001
``nano``           ``n``                10 :sup:`-9`          0.000 000 001
``micro``          ``u``, ``mc``, ``µ`` 10 :sup:`-6`          0.000 001
``milli``          ``m``                10 :sup:`-3`          0.001
``centi``          ``c``                10 :sup:`-2`          0.01
``deci``           ``d``                10 :sup:`-1`          0.1
``deca``, ``deka`` ``da``               10 :sup:`1`           10
``hecto``          ``h``                10 :sup:`2`           100
``kilo``           ``k``                10 :sup:`3`           1 000
``mega``           ``M``                10 :sup:`6`           1 000 000
``giga``           ``G``                10 :sup:`9`           1 000 000 000
``tera``           ``T``                10 :sup:`12`          1 000 000 000 000
``peta``           ``P``                10 :sup:`15`          1 000 000 000 000 000
``exa``            ``E``                10 :sup:`18`          1 000 000 000 000 000 000
``zetta``          ``Z``                10 :sup:`21`          1 000 000 000 000 000 000 000
``yotta``          ``Y``                10 :sup:`24`          1 000 000 000 000 000 000 000 000
================== ==================== ===================== ===================================
