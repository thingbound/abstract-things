Code
=====

Value type for representing a code with a description. Codes are commonly used
for things like errors, actions and modes that need to be identifiable but also
a human readable description.

.. sourcecode:: js

	const { code } = require('abstract-things/values');

	const testCode = code('test');
	console.log(testCode.id);
	console.log(testCode.description);

	const testCode2 = code({ id: 'test', description: 'Description for code' });
	const testCode3 = code('test: Description for code');

