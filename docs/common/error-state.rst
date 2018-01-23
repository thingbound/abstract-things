``cap:error-state`` - error reporting
=============================================

The ``error-state`` capability is used when a thing can report an error, such
as a humidifier running out of water or a autonomous vacuum getting stuck.

.. sourcecode:: js

	if(thing.matches('cap:error-state')) {
		if(thing.error) {
			console.log('Error is:', thing.error);
		}
	}

API
---

.. js:function:: error()

	Get the current error or ``null`` if no error.

	:returns:
		Promise that resolves to a :doc:`code </values/code>` if the thing is
		currently in an error state, or ``null`` if no error state.

	Example:

	.. sourcecode:: js

		thing.error()
			.then(err => ...)
			.catch(...);

		const error = await thing.error();

Events
------

.. describe:: errorChanged

	The current error has changed. The payload will be the current error state
	as a :doc:`code </values/code>` or ``null``.

	Example:

	.. sourcecode:: js

		thing.on('errorChanged', error => console.log('Error state:', error));

.. describe:: error

	Emitted when an error occurs. The payload will be the error.

	Example:

	.. sourcecode:: js

		thing.on('error', error => console.log('Error occured:', error));

.. describe:: errorCleared

	Emitted when the thing no longer has an error.

	Example:

	.. sourcecode:: js

		thing.on('errorCleared', () => console.log('Thing no longer has an error'));

Protected methods
-----------------

.. js:function:: updateError(batteryLevel)

	Update the current error state.

	:param code error:
		The new error state as a :doc:`code </values/code>` or ``null`` if
		no error.

	Example:

	.. sourcecode:: js

		this.updateError('some-error');
		this.updateError(null);

Implementing capability
-----------------------

When implementing this capability the implementor needs to call
``updateError`` whenever an error state is entered or left.

.. sourcecode:: js

	const { Thing, ErrorState } = require('abstract-things');

	class Example extends Thing.with(ErrorState) {

	}
