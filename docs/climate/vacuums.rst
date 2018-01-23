``type:vacuum`` - Vacuum cleaners
=================================

Vacuum cleaners are used as a type for both autonomous and non-autonomous
cleaners.

.. sourcecode:: js

	if(thing.matches('type:vacuum')) {
		// The thing is a vacuum
	}

Implementing type
-----------------

.. sourcecode:: js

	const { Vacuum } = require('abstract-things/climate');

	class Example extends Vacuum.with(...) {

	}
