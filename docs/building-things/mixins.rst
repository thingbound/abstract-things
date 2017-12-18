Mixins and ``with``
====================

As things are just a combination of types and capabilities in there is support
for combining them built in to the core library. ``Thing`` provides a method
``with`` that mixes several types and capabilities together:

.. sourcecode:: js

	class CustomThing extends Thing.with(Mixin1, Mixin2) {
		...
	}

Defining a mixin
-----------------

Mixins are defined via ``Thing.mixin`` and they work the same as a normal
``Thing``-class such as with :doc:`metadata <metadata>`. Mixins are functions
that create a JavaScript class with a specific parent:

.. sourcecode:: js

	const { Thing } = require('abstract-things');

	const CustomMixin = Thing.mixin(Parent => class extends Parent {

		static get capability() {
			return 'custom:cap';
		}

		constructor(...args) {
			// Most mixins should call super with all arguments
			super(...args);

			// Set properties, initialize event listeners as normal
			this.custom = true;
		}

		customMethod() {
			return this.custom;
		}

	});

Internal capabilities
---------------------

In some cases when building a library things will be very straight-forward,
just extend ``Thing`` with whatever is needed, implement the behavior and
abstract methods and you're done. In other cases such as when working against
a IoT-bridge for things such as lights or sensors you might find that its
useful to package the API used to talk to the thing as an internal capability.

Example:

.. sourcecode:: js

	const { Thing } = require('abstract-things');
	const { Light, SwitchablePower } = require('abstract-things/light');

	// This mixin provides access to the external API for custom capabilities
	const CustomAPI = Thing.mixin(Parent => class extends Parent {

		constructor(api) {
			super();

			this.api = api;
		}

		initCallback() {
			return super.initCallback()
				// Ask the fake API to initialize itself
				.then(() => this.api.init());
		}

	});

	/*
	 * Create the custom capability that provides an implementation of
	 * SwitchablePower on top of CustomAPI.
	 */
	const CustomPower = Thing.mixin(Parent => class extends Parent
		.with(CustomAPI, SwitchablePower) {

		initCallback() {
			return super.initCallback()
				.then(() => {
					// During init this connects to the powerChanged event of our fake API
					this.api.on('powerChanged', power => this.updatePower(power))

					// Set the power as well
					this.updatePower(this.api.hasPower());
				});
		}

		updatePower(power) {
			return this.api.setPower(power);
		}

	});

	const CustomDimmable = ...;

	// Define the specific combinations that can exist
	const PoweredThing = Light.with(CustomPower);
	const PoweredAndDimambleThing = Light.with(CustomPower, CustomDimmable);

	// Create them and pass the API-instance
	new PoweredThing(getApiSomehow());
