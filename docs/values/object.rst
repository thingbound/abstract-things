Object
=====

Value type for representing an object. Mostly used when converting to and from
JSON.

.. sourcecode:: js

	const values = require('abstract-things/values');

	const json = values.toJSON('object', { key: 'value' });
	const array = values.fromJSON('object', json);
