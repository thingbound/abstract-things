Using things
=============

Things provide a basic shared API no matter their types and capabilities. The
``matches`` method can be used to match tags and to figure out what a thing is
and what it can do:

.. sourcecode:: js

	if(thing.matches('cap:colorable')) {
		console.log('Current color:', thing.color());
	}

Events are one of the most important parts of things and listeners can be added
via the ``on`` method:

.. sourcecode:: js

	thing.on('colorChanged', color => console.log('The color has changed'));

	// Listeners receive the thing as the second argument
	const handler = (color, thing) => console.log('Color is now', color, 'for thing', thing);
	thing1.on('colorChanged', handler);
	thing2.on('colorChanged', handler);

Thing API
----------

.. js:attribute:: id

	The unique identifier of the thing as a string. The identifier should be
	globally unique and contain a namespace.

	Example:

	.. sourcecode:: js

		console.log(thing.id);

	Example of identifiers:

	* ``hue:000b57fffe0eee95-01``
	* ``miio:55409498``
	* ``uuid:8125606b-7b57-405b-94d6-e5720c44aa6a``
	* ``space:global``

	See :doc:`../building-things/naming` for more details.

.. js:attribute:: metadata

	Metadata associated with the thing. Contains information about types and
	capabilities.

	Example:

	.. sourcecode:: js

		console.log(thing.metadata);
		console.log(thing.metadata.tags);
		console.log(thing.metadata.types);
		console.log(thing.metadata.capabilities);

.. js:function:: matches(...tags)

	Check if a thing matches a set of tags. Tags are created by the types
	and capabilities of the thing.

	:param ...tags: Set of tags that the thing should have.
	:returns: Boolean indicating if the thing has the given tags.

	Example:

	.. sourcecode:: js

		if(thing.matches('type:light', 'cap:switchable-power')) {
			// Thing is of type light and has the switchable-power capability
		}

.. js:function:: on(eventName, listener)

	Register a listener for the given event. The listener will be invoked when
	the thing emits the event. The listener will receive two arguments, the
	first being the value of the event (or null) and the second being a
	reference to the Thing that emitted the event.

	:param string eventName: The name of the event to listen for.
	:param function listener: Function that will be invoked when the event is emitted.

	Example:

	.. sourcecode:: js

		thing.on('stateChanged', (change, thing) =>
			console.log(thing, 'changed state:', change)
		);

.. js:function:: off(eventName, listener)

	Remove a listener for the given event. The listener must have been
	previously registered via :js:func:`on`.

	:param string eventName: The name of the event that the listener was registered for.
	:param function listener: Function that was used when registering the listener.

.. js:function:: init()

	Initialize the thing. Most commonly used when creating a new thing. Many
	libraries provide already initalized things via their main discovery or
	creation function.

	:returns: Promise that resolves to the instance being initalized.

	.. sourcecode:: js

		thing.init()
			.then(thing => /* do something with the thing */)
			.catch(/* handle error */);

.. js:function:: destroy()

	Destroy the thing. Should be called whenever the thing is no longer needed.

	:returns: Promise that resolves to the instance being destroyed.

	.. sourcecode:: js

		thing.destroy()
			.then(thing => /* do something with the thing */)
			.catch(/* handle error */);

Remote API
--------------

When a thing is exposed via a remote API, such as in `Tinkerhub
<https://github.com/tinkerhub/tinkerhub>`_, it extends the above API with the
addition that actions (and properties) return promises.

Example:

.. sourcecode:: js

	// Properties are now functions that return promises:
	thing.state()
		.then(result => console.log('Invoked state and got', state))
		.catch(err => console.log('Error occurred:', err);

	// async/await can be used with actions:
	const power = await thing.power(false);

	// The base API still works as before:
	console.log(thing.id);
	thing.on('stateChanged', change => console.log(change));
