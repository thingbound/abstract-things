Metadata
==========

Metadata for a thing is provided either via ``static`` getters and methods on
the defining class or during creation and initialization.

.. sourcecode:: js

	const { Thing, State } = require('thing');

	// Calling with(State) will automatically add the state capability
	class CustomThing extends Thing.with(State) {
		// This marks the thing as a custom:thing
		static get type() {
			return 'custom:thing';
		}

		constructor() {
			super();

			// Identifier is always required - set it
			this.id = 'custom:idOfThing';

			// Set the name of this thing, optional but recommended
			this.metadata.name = 'Optional name of thing';

			// Dynamically add a custom capability
			this.metadata.addCapabilities('custom:cap');
		}
	}

Identifiers and name
--------------------

The identifier of the thing could be considered metadata, but is actually set
directly on the thing. This should be done either in the constructor or during
initialization. See :doc:`naming` for details about the identifier structure.

The name of the thing can be set on the metadata:

.. sourcecode:: js

	this.metadata.name = 'Custom Thing';

It is recommended to implement :doc:`nameable <../common/nameable>` if either
the thing being interacted with does not provide a default name or it supports
changing the name via its API.

Static getters for types and capabilities
------------------------------------------

.. js:function:: static get type()

	Set a single extra type. Usually used by type-definitions to declare their
	type.

	Example:

	.. sourcecode:: js

		static get type() {
			return 'namespace:custom-type';
		}

.. js:function:: static get types()

	Set several extra types.

	Example:

	.. sourcecode:: js

		static get types() {
			return [ 'namespace:custom-type' ];
		}

.. js:function:: static get capability()

	Set a single extra capability. Usually used by full capabilities that are
	mixed in with ``Thing``.

	Example:

	.. sourcecode:: js

		static get capability() {
			return 'namespace:custom-cap';
		}

.. js:function:: static get capabilities()

	Set serveral extra capabilities.

	Example:

	.. sourcecode:: js

		static get capabilities() {
			return [ 'namespace:custom-cap' ];
		}

Dynamically adding
------------------

Types can be added at any time and so can capabilities. Capabilities can also
be removed.

.. js:function:: metadata.addTypes(...types)

	Add one or more types to the metadata.

	:param ...types: Types as strings that should be added.
	:returns: The metadata object for chaining.

	Example:

	.. sourcecode:: js

		this.metadata.addTypes('custom:type', 'custom:type-2');

.. js:function:: metadata.addCapabilities(...caps)

	:param ...caps: Capabilities as strings that should be added.
	:returns: The metadata object for chaining.

	Example:

	.. sourcecode:: js

		this.metadata.addCapabilities('custom:cap', 'color:temperature');

.. js:function:: metadata.removeCapabilities(...caps)

	:param ...caps: Capabilities as strings that should be removed.
	:returns: The metadata object for chaining.

	Example:

	.. sourcecode:: js

		this.metadata.removeCapabilities('custom:cap', 'custom:connected');
