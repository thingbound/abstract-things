Boolean
========

Boolean value type. Supports conversion from many common string values.

.. sourcecode:: js

	const { boolean } = require('abstract-things/values');

	console.log(boolean('true'));
	console.log(boolean(false));
	console.log(boolean(1));
	console.log(boolean('no'));

String conversion
-----------------

``true``, ``yes``, ``on``, ``1`` will be treated as ``true``.
``false``, ``no``, ``off``, ``0`` represent a ``false`` value. Any other
string values will be treated as an error.
