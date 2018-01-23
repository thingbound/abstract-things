``cap:nameable`` - renameable things
====================================

``nameable`` is used by things that have a name that can be updated.

.. sourcecode:: js

	if(thing.matches('cap:nameable')) {
		thing.setName('New Name')
			.then(() => console.log('Name updated'))
			.catch(err => console.log('Error occurred during update:', err));
	}

API
---

.. js:function:: setName(name)

	Update the name of this thing.

	:param string name: Name for thing.
	:returns: Promise that resolves to the name set.

Protected methods
-----------------

.. js:function:: changeName(name)

	*Abstract.* Change and store the name of the thing. This is called when the
	user calls ``setName``. This method should update the ``name`` property of
	the metadata when the new name has been stored.

	:param string name: The name to set.
	:returns: Promise that resolves after name has been updated.

	Example:

	.. sourcecode:: js

		changeName(name) {
			return setNameSomehow(name)
				.then(() => this.metadata.name = name);
		}

Implementing capability
-----------------------

``changeName`` needs to be implemented to actually set the name. The name
should be loaded and set either in the constructor or ``initCallback`` of the
thing.

.. sourcecode:: js

	const { Thing, Nameable } = require('abstract-things');

	class Example extends Thing.with(Nameable) {
		initCallback() {
			return super.initCallback()
				.then(() => loadNameSomehow())
				.then(name => this.metadata.name = name);
		}

		changeName(name) {
			return setNameSomehow(name)
				.then(() => this.metadata.name = name);
		}
	}

For things that just need to be nameable a special capability is provided
that stores the name locally:

.. sourcecode:: js

	const { Thing, EasyNameable } = require('abstract-things');

	class Example extends Thing.with(EasyNameable) {
	}
