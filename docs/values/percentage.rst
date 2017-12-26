Percentage
==========

Number representing a percentage, forces the number to be between 0 and 100.

.. sourcecode:: js

	const { percentage } = require('abstract-things/values');

	console.log(percentage(80.2));
	console.log(percentage('80.2'));
	console.log(percentage('80%'));

String conversion
-----------------

String conversion uses ``parseFloat``.
