Initalization and destruction
=============================

Managing the lifecycle of a thing can be done via callbacks for initialization
and destruction. Both callbacks are asynchronous using promises. Any
initalization that can not be done synchronous in the constructor should be
done via ``initCallback``. The callback will be called when ``init()`` is
called on the thing.

``destroyCallback`` can be used for anything that needs to be done when the
thing is destroyed, such as releasing socket connections and other resources.
The callback is also asynchronous and will be called when ``destroy()`` is
called on the thing.

.. sourcecode:: js

	class Example extends Thing {

		initCallback() {
			return super.initCallback()
				.then(() => console.log('initCallback run'));
		}

		destroyCallback() {
			return super.destroyCallback()
				.then(() => console.log('destroyCallback run'));
		}
	}

	new Example()
		// Initialize the thing
		.init()
		.then(thing => {
			// Then directly destroy it
			return thing.destroy();
		})
		.then(() => console.log('init() and destroy() finished'))
		.catch(err => console.log('Error occurred', err);

Protected methods
-----------------

.. js:function:: initCallback()

	Callback to run when a thing is being initalized via ``init()``.
	Implementation should return a promise and must call super.

	:returns: Promise that resolves when initalization is done.

	Example implementation:

	.. sourcecode:: js

		initCallback() {
			return super.initCallback()
				.then(() => {
					// Custom initalization code
				});
		}

	Example using async/await:

	.. sourcecode:: js

		async initCallback() {
			await super.initCallback();

			// Custom initalization code
		}

.. js:function:: destroyCallback()

	Callback to run when a thing is being destroyed via ``destroy()`.
	Implementation should return a promise and must call super.

	:returns: Promise that resolves when initalization is done.

	Example implementation:

	.. sourcecode:: js

		destroyCallback() {
			return super.destroyCallback()
				.then(() => {
					// Custom destruction code
				});
		}

	Example using async/await:

	.. sourcecode:: js

		async destroyCallback() {
			await super.destroyCallback();

			// Custom destruction code
		}
