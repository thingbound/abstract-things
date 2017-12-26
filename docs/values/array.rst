Array
=====

Value type for representing an array. Mostly used when converting to and from
JSON.

.. sourcecode:: js

	const values = require('abstract-things/values');

	const json = values.toJSON('array', [ 'one', 'two' ]);
	const array = values.fromJSON('array', json);
