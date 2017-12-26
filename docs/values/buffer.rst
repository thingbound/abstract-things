Buffer
======

Buffer value type, for representing binary values.

.. sourcecode:: js

	const { buffer } = require('abstract-things/values');

	console.log(buffer(nodeBuffer));
	console.log(buffer('base64-encoded-string-here'));
	console.log(buffer([ 100, 20, 240 ]));

