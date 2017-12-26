Mixed
=====

Value type representing mixed values. Mostly used for converting to and from
JSON. A mixed value can be any other value supported.

.. sourcecode:: js

	const values = require('abstract-things/values');

	const json = values.toJSON('mixed', somethingToConvert);
	const array = values.fromJSON('mixed', json);
