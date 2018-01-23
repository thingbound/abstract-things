``cap:children`` - access child things
======================================

This capability is used when a thing has children. Children are used to map
when a thing is a bridge or when a physical thing has several virtual children.
An example of such use is for :doc:`power strips </electrical/strips>` that
support control or monitoring of their indivudal outlets.

.. sourcecode:: js

	if(thing.matches('cap:children')) {
		// Get all children
		const children = thing.children();

		// Get a single child
		const child = thing.child('usb');
	}

API
---

.. js:function:: children()

	Get the children of the thing as an iterable.

	Example:

	.. sourcecode:: js

		for(const child of thing.children) {
			console.log('Child:', child);
		}

.. js:function:: child(id)

	Get a child based on its identifier. The identifier can either be a full
	identifier or a partial one.

	:param string id: The identifier to get thing for.
	:returns: The thing if found or ``null``.

	Example:

	.. sourcecode:: js

		const child = thing.child(fullIdOrPartial);

Partial identifiers
-------------------

Partial identifiers are identifiers that make it easier to find a child. The
are constructed in such a way that the full identifier is a combination of the
parent id with a short logical id for the child.

For a thing with id ``example:thing`` a child with the partial identifier
``usb`` would have the full id ``example:thing:usb``.

Events
------

.. describe:: thing:available

	A new child is available for this thing. Emitted whenver a child is added.

	Example:

	.. sourcecode:: js

		thing.on('thing:available', child => console.log('Added child:', child));

.. describe:: thing:unavailable

	A child is no longer available. Emitted when a child is no longer available.

	Example:

	.. sourcecode:: js

		thing.on('thing:unavailable', child => console.log('Removed child:', child));

Protected methods
-----------------

.. js:function:: addChild(thing)

	Add a child to this thing. This will add the thing and emit the
	``thing:available`` event.

	:param thing: The thing to add as a child.

	Example:

	.. sourcecode:: js

		this.addChild(new ChildThing(...));

.. js:function:: removeChild(thingOrId)

	Remove a child from this thing. This will remove the thing and emit the
	``thing:unavailable`` event.

	:param thingOrId: The thing instance or identifier that should be removed.

	Example:

	.. sourcecode:: js

		this.removeChild(existingChild);
		this.removeChild('id-of-thing');

.. js:function:: findChild(filter)

	Find the first child that matches the given filter function.

	:param function filter:
		Filter function to apply, should return ``true`` when a thing matches.
	:returns:
		Thing if found, otherwise ``null``.

	Example:

	.. sourcecode:: js

		// Get the first power outlet
		this.findChild(thing => thing.matches('type:power-outlet'));

Implementing capability
-----------------------

When implementing this capability children need to be managed. This can either
be done manually or via a method such as ``ChildSyncer``.

Manual management is recommended if only a few known children exist:

.. sourcecode:: js

	const { Thing, Children } = require('abstract-things');

	class Example extends Thing.with(Children) {

		constructor() {
			super();

			this.addChild(new ChildThing(this, ...));
		}

	}

Using ``ChildSyncer``, commonly for things such as bridges:

.. sourcecode:: js

	const { ChildSyncer } = require('abstract-things/children');

	class Example extends Thing.with(Children) {

		constructor() {
			super();

			this.syncer = new ChildSyncer(this, (def, thing) => {

			});
		}

		async initCallback() {
			await super.initCallback();

			await this.loadChildren();
		}

		async loadChildren() {
			/*
			 * Load the children, should be an array with objects that contain
			 * at least an `id` property.
			 */
			const defs = await loadChildrenSomehow();

			await syncer.update(defs);
		}
	}
